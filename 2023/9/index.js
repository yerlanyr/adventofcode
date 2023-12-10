import fs from "fs";
import { dirname } from "path";
import {
  aperture, last,
  map, o, pipe, reverse, sum, transduce
} from "ramda";
import { fileURLToPath } from "url";

function solve(input) {
  const lines = input
    .split("\n")
    .map((line) => line.split(" ").map((x) => parseInt(x, 10)));
  const derive = pipe(
    aperture(2),
    map(([a, b]) => b - a)
  );
  const transducer = map(nums => [interpolate(nums), interpolate(reverse(nums))])
  console.log(transduce(transducer, ([a,b], [c,d]) => [a + c, b + d], [0, 0], lines))
  
  function interpolate(nums) {
    let steps = [nums];
    let current = nums;
    while (!current.every((x) => x === 0)) {
      current = derive(current);
      steps.push(current);
    }
    return o(sum, map(last))(steps);
  }
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
