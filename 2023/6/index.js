import { fileURLToPath } from "url";
import fs from "fs";
import { dirname } from "path";
import { map, multiply, reduce, zip } from "ramda";

function solve(input) {
  const [timeLine, distanceLine] = input.split("\n");
  const times = timeLine.match(/\d+/g).map((x) => Number(x, 10));
  const distances = distanceLine.match(/\d+/g).map((x) => Number(x, 10));
  console.log(
    reduce(
      multiply,
      1,
      map(
        ([timeLimit, record]) => amountOfWinning(timeLimit, record),
        zip(times, distances)
      )
    )
  );
  // second part
  const time = BigInt(times.join(''))
  const distance = BigInt(distances.join(''))
  console.log(amountOfWinning2(time, distance))

  function amountOfWinning(timeLimit, record) {
    // extremum is the half of timeLimit
    let extreme = Math.floor((timeLimit) / 2);
    // binary search the left of record
    let i =  0;
    for (let step = extreme; step > 0; step >>= 1) {
      while ((timeLimit - i - step) * (i + step) <= record && i + step <= extreme) {
        i = i + step;
      }
    }
    while((timeLimit - i) * i <= record) {
      i++;
    }
    return (extreme - i + 1) * 2 - ((timeLimit + 1) % 2);
  }
  function amountOfWinning2(timeLimit, record) {
    // extremum is the half of timeLimit
    let extreme = (timeLimit) / 2n;
    // binary search the left of record
    let i = 0n;
    for (let step = extreme; step > 0n; step >>= 1n) {
      while ((timeLimit - i - step) * (i + step) <= record && i + step <= extreme) {
        i = i + step;
      }
    }
    while((timeLimit - i) * i <= record) {
      i++;
    }
    return (extreme - i + 1n) * 2n - ((timeLimit + 1n) % 2n);
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
