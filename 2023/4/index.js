import { getFileContents } from "../utilities/getFileContents.js";
import { consoleLogJson } from "../utilities/consoleLogJson.js";
import { parseByDefinition } from "../utilities/parseByDefinition.js";
import { intersection, sum } from "ramda";

const myInput = getFileContents("./input.txt");
const testInput = getFileContents("./test.txt");

function solve(input) {
  let parsedInput = parseByDefinition(
    ["\n", [[String, " ", Number], ": ", [[" ", String], "| ", [" ", String]]]],
    input
  );
  // process empties
  for(let card of parsedInput) {
    card[1][0] = card[1][0].filter(s => s !== '')
    card[1][1] = card[1][1].filter(s => s !== '')
  }
  let result = 0
  let timesToProcess = Array.from({length: parsedInput.length}, () => 1)
  let i = 0
  for(let card of parsedInput) {
    const [, [winning, mineNumbers]] = card
    const intersect = intersection(mineNumbers.filter(x => !!x), winning.filter(x => !!x))
    if(intersect.length > 0) {
      result += 1 << (intersect.length - 1)
      for(let j = i + 1; j < Math.min(i + 1 + intersect.length, parsedInput.length); j++) {
        timesToProcess[j]+= timesToProcess[i];
      }
    }
    i++
  }
  console.log("1st part result: ", result);
  console.log("2st part result: ", sum(timesToProcess));
}
console.log("Test input");
solve(testInput);
solve(myInput);
