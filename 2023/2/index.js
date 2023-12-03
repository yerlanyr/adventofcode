import { map, max, o, prop, reduceBy, sum, unnest } from "ramda";
import { parseByDefinition } from "../utilities/parseByDefinition.js";
import { solution } from "../utilities/solution.js";

solution(
  "./input.txt",
  "./test.txt",
  (contents) =>
  {
    contents.split('\n').map(line => {
      return {
        id: line.match(/Game (\d+)/)[1],
        foldedSets: {
          red: sum(map(Number.parse)(line.match(/(\d+) red/g))),
          green: sum(map(Number.parse)(line.match(/(\d+) red/g))),
          blue: sum(map(Number.parse)(line.match(/(\d+) red/g)))
        }
      }
    })
  },
  (input) => {
    // const gamesThatSatisfies = foldedGames.filter(
    //   (games) =>
    //     games.foldedSets.red <= 12 &&
    //     games.foldedSets.green <= 13 &&
    //     games.foldedSets.blue <= 14
    // );

    // return o(sum, map(prop("id")))(gamesThatSatisfies);
  },
  (input) => {
    // const sndPart = foldedGames.map(
    //   (game) =>
    //     game.foldedSets.red * game.foldedSets.blue * game.foldedSets.green
    // );
    // return sum(sndPart);
  }
);
