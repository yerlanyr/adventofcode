import fs from "fs";
import { dirname } from "path";
import { splitEvery } from "ramda";
import { fileURLToPath } from "url";
import { toInterval, intervalIntersects, shiftInterval, multiplyInterval, subtractInterval } from "../utilities/intervalMath";

function solve(input) {
  const groups = input.split("\n\n");
  let seeds = groups[0]
    .split(": ")[1]
    .split(" ")
    .map((x) => Number.parseInt(x, 10));
  const transitions = groups.slice(1).map((group) =>
    group
      .split("\n")
      .slice(1)
      .map((line) => line.split(" ").map((x) => Number.parseInt(x, 10)))
  );
  const seedRanges = splitEvery(2, seeds);
  let intervals = seedRanges.map(toInterval);
  for (let rules of transitions) {
    let newIntervals = [];
    let rulesSrcDiffs = rules.map((rule) => [
      toInterval([rule[1], rule[2]]),
      rule[0] - rule[1],
    ]);
    for (let interval of intervals) {
      const applicableRules = rulesSrcDiffs.filter(([src]) =>
        intervalIntersects(interval, src)
      );

      // new ranges using rules on my range
      const resultingIntervals = applicableRules.map(([src, diff]) =>
        shiftInterval(multiplyInterval(interval, src), diff)
      );
      // what to take out from the original is
      const intervalsToTakeOut = applicableRules.map(([src]) => src);
      const restIntervals = intervalsToTakeOut.reduce(
        (agg, cur) => {
          return agg.flatMap((interval) => subtractInterval(interval, cur))
        },
        [interval]
      );
      for(const interval of restIntervals) {
        newIntervals.push(interval)
      }
      for(const interval of resultingIntervals) {
        newIntervals.push(interval)
      }
    }
    intervals = newIntervals;
  }
  console.log(Math.min(...intervals.map(([a,b]) => a)));
}
solve(
  fs
    .readFileSync(dirname(fileURLToPath(import.meta.url)) + "/test.txt")
    .toString()
);
solve(
  fs
    .readFileSync(dirname(fileURLToPath(import.meta.url)) + "/input.txt")
    .toString()
);

