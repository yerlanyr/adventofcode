import fs from "fs";
import { dirname } from "path";
import { aperture, count, last, map, o, pipe, reverse, sum, transduce, unnest } from "ramda";
import { fileURLToPath } from "url";

function solve(input) {
  const arr = input.split("\n").map((x) => x.split(""));
  // find S
  let si, sj;
  let n = arr.length;
  let m = arr[0].length;
  outer: for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[0].length; j++) {
      if (arr[i][j] === "S") {
        si = i;
        sj = j;
        break outer;
      }
    }
  }
  // run dfs
  let vd = new Set();
  let key = (i, j) => `${i} ${j}`;
  const up = [-1, 0];
  const down = [1, 0];
  const left = [0, -1];
  const right = [0, 1];
  const symbolToDirections = {
    S: [up, down, left, right],
    L: [up, right],
    "|": [up, down],
    "-": [left, right],
    J: [up, left],
    7: [down, left],
    F: [right, down],
    ".": [],
  };
  const findPossibleAdj = (i, j) => {
    const dirs = symbolToDirections[arr[i][j]];
    return dirs
      .map(([di, dj]) => [i + di, j + dj])
      .filter(([i, j]) => {
        return i >= 0 && i < n && j >= 0 && j < m;
      });
  };
  const findAdj = (i, j) => {
    const padj = findPossibleAdj(i, j);
    return padj.filter(([vi, vj]) =>
      findPossibleAdj(vi, vj).some(([ui, uj]) => ui === i && uj === j)
    );
  };
  const q = [];
  let qi = 0;
  q.push([si, sj, 0]);
  let points = arr.map(() => Array.from({ length: m }, () => false));
  points[si][sj] = true;
  let maxT = 0;
  while (qi < q.length) {
    const [i, j, t] = q[qi];
    if (vd.has(key(i, j))) {
      qi++;
      continue;
    }
    vd.add(key(i, j));
    points[i][j] = true;
    for (let [vi, vj] of findAdj(i, j)) {
      if (arr[(vi, vj)] === "S") {
        // we are looping!
        console.log(t);
      }
      if (!vd.has(key(vi, vj))) {
        q.push([vi, vj, t + 1]);
        maxT = Math.max(t + 1, maxT);
      }
    }
    qi++;
  }
  // points of the loop are saved in vd
  //
  console.log(maxT);
  // second part is find all dots that are inside
  // take all walls for the said point in arrr
  let cnt = 0
  for(let i=0;i<n;i++){
    for(let j=0;j<m;j++){
      if(!points[i][j]) {
        // take all in arr after the line
        const walls = arr[i].slice(j + 1).filter((value, jj) => points[i][jj + j + 1]).join('')
        if(walls === '') continue;
        const matches = walls.match(/\||S-*J|F-*J|L-*7/g);
        if(!matches) continue
        if(matches.length % 2 === 1) {
          cnt++
        }
      }
    }
  }
  console.log(cnt)
  
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
