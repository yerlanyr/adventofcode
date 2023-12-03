import { groupBy, map, max, maxBy, min, minBy, reduce } from "ramda";
import { getFileContents } from "../utilities/getFileContents.js";

const testInput = getFileContents("./test.txt");
const myInput = getFileContents("./input.txt");

function solve(input) {
  let A = input.split("\n");
  let buffer = [];
  let startJ;
  let endJ;
  let result = 0;
  // for(let i=0;i<A.length;i++) {
  //   for(let match of A[i].matchAll(/\d+/gd)) {
  //     console.log(match)
  //     let startJ = match.index
  //     let number = match[0]
  //     if(hasSymbolAround(number, i, startJ)) {
  //       result += Number.parseInt(number, 10)
  //     }
  //   }

  //   console.log('Result part 1: ', result)
  // }
  function hasSymbolAround(buffer, startI, startJ) {
    for (
      let i = Math.max(startI - 1, 0);
      i < Math.min(startI + 2, A.length);
      i++
    ) {
      for (
        let j = Math.max(startJ - 1, 0);
        j < Math.min(startJ + buffer.length + 1, A[i].length);
        j++
      ) {
        if (i === startI && j >= startJ && j < startJ + buffer.length) {
          // console.log('Within bounds skipping')
          continue;
        }
        console.log("Analysing", i, j);
        // console.log('Not within bounds')
        if (!/\d/.test(A[i][j]) && A[i][j] !== ".") {
          // console.log('Has a symbol', i, j, A[i][j])
          return true;
        }
      }
    }
    return false;
  }
  result = 0
  // second part
  for (let i = 0; i < A.length; i++) {
    // find gear
    for (let match of A[i].matchAll(/\*/dg)) {
      let j = match.index;
      // run dfs for the left and right from adj
      let v = new Set();
      function dfs(ii, jj) {
        if (v.has(`${ii} ${jj}`) || !/\d/.test(A[ii][jj])) {
          return;
        }
        v.add(`${ii} ${jj}`);
        // visit left and right
        if (jj > 0) {
          dfs(ii, jj - 1);
        }
        if (jj + 1 < A[ii].length) {
          dfs(ii, jj + 1);
        }
      }
      for (let ii = Math.max(0, i - 1); ii < Math.min(A.length, i + 2); ii++) {
        for (
          let jj = Math.max(0, j - 1);
          jj < Math.min(A[i].length, j + 2);
          jj++
        ) {
          dfs(ii, jj);
        }
      }

      // sort visited
      const dotsSorted = map(
        (value) => {
          const js = map(([,j]) => j, value)
          return [
            reduce(
              min,
              js[0],
              js
            ),
            reduce(
              max,
              js[0],
              js
            ),
          ];
        },
        groupBy(
          ([i]) => i,
          Array.from(v.values())
            .map((v) => {
              let [i, j] = v.split(" ");
              return [Number.parseInt(i), Number.parseInt(j)];
            })
            .sort(([ai, aj], [bi, bj]) => (ai != bi ? ai - bi : aj - bj))
        )
      );

      var lines = []
      for(let [key, value] of Object.entries(dotsSorted)) {
        lines.push(A[key].substring(value[0], value[1] + 1))
      }
      let nums = []
      for(let line of lines)
      for(let match of line.matchAll(/\d+/gd)) {
        nums.push(Number.parseInt(match[0], 10))
      }
      if(nums.length === 2) {
        result += nums[0] * nums[1]
      }
    }
  }

  console.log('Second part', result)
}

solve(testInput);
solve(myInput)
