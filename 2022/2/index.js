import { getFileContents } from "../../2023/utilities/getFileContents.js";
import { parseByDefinition } from "../../2023/utilities/parseByDefinition.js";

const input = parseByDefinition(
  ["\n", [String, " ", String]],
  getFileContents("./input.txt")
);

const total = input.reduce((total, [Them, You]) => {
  // what's diff ?
  const a = Them.charCodeAt(0) - "A".charCodeAt(0);
  const b = You.charCodeAt(0) - "X".charCodeAt(0);
  const choice = [1, 2, 3];
  console.log(a, b);
  if (a === b) {
    // draw
    return total + 3 + choice[b];
  } else if (a - b === 1 || a - b === -2) {
    // loss
    return total + 0 + choice[b];
  } else {
    // win
    return total + 6 + choice[b];
  }
}, 0);

console.log(total);
