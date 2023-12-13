import { assocPath, difference, equals, transpose, zipWith, modifyPath, intersection } from "ramda";
import { readFileSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const input = readFileSync(dirname(fileURLToPath(import.meta.url)) + '/input.txt').toString()
// const input = `#.##..##.
// ..#.##.#.
// ##......#
// ##......#
// ..#.##.#.
// ..##..##.
// #.#.##.#.

// #...##..#
// #....#..#
// ..##..###
// #####.##.
// #####.##.
// ..##..###
// #....#..#`;

const A = input
  .split("\n\n")
  .map((x) => x.split("\n").map((row) => row.split("")));
let cnt = 0;
for (let a of A) {
  const xs = analyseTheBoard(a);
  search: for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a[0].length; j++) {
      const newA = modifyPath([i, j], (x) => x === '.' ? '#' : '.', a)
      const newXs = Array.from(analyseTheBoard(newA))
      // what I got from it is does it have new reflection points?
      const diff = difference(newXs, xs)
      if(diff.length > 0) {
        // cool we found our smudge
        for(const [amount, isRow] of diff) {
          cnt += !isRow ? amount : amount * 100
        }
        break search;
      }
    }
  }
}

function analyseTheBoard(a) {
  // code for analyzing the board
  const res = []
  let isRow = false;
  for (let b of [a, transpose(a)]) {
    isRow = !isRow;
    for (let r = 1; r < b.length; r++) {
      let flag = true;
      for (
        let i = r - 1, j = r;
        i >= 0 && j < b.length && i + 1 < b.length;
        i--, j++
      ) {
        if (!equals(b[i], b[j])) {
          flag = false;
          break;
        }
      }
      if (flag) {
        res.push([r, isRow]);
      }
    }
  }
  return res
}

console.log(cnt);
