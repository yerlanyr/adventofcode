import { map, max, o, prop, reduceBy, sum, unnest } from "ramda";
import { parseByDefinition } from "../utilities/parseByDefinition.js";
import { solution } from "../utilities/solution.js";

solution(
  "./input.txt",
  "./test.txt",
  (contents) =>
    parseByDefinition(
      [
        "\n",
        [[String, " ", Number], ": ", ["; ", [", ", [Number, " ", String]]]],
      ],
      contents
    ).map(([[, id], sets]) => ({
      id,
      foldedSets: reduceBy(
        (acc, [amount]) => max(amount, acc),
        0,
        prop(1),
        unnest(sets)
      ),
    })),
  (foldedGames) => {
    const gamesThatSatisfies = foldedGames.filter(
      (games) =>
        games.foldedSets.red <= 12 &&
        games.foldedSets.green <= 13 &&
        games.foldedSets.blue <= 14
    );

    return o(sum, map(prop("id")))(gamesThatSatisfies);
  },
  (foldedGames) => {
    const sndPart = foldedGames.map(
      (game) =>
        game.foldedSets.red * game.foldedSets.blue * game.foldedSets.green
    );
    return sum(sndPart);
  }
);
