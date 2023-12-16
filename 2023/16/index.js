import fs from 'fs'
const input = fs.readFileSync('./input.txt').toString();
// const input = `.|...\\....
// |.-.\\.....
// .....|-...
// ........|.
// ..........
// .........\\
// ..../.\\\\..
// .-.-/..|..
// .|....-|.\\
// ..//.|....`


const grid = input.split("\n").map((x) => x.split(""));

let visited = new Set();
// dfs with visited being direction + point
// direction could be w n e s
function dfs(direction, point) {
  // console.log(direction, point)
  const key = JSON.stringify([direction, point]);
  if (visited.has(key)) {
    return;
  }
  visited.add(key);
  const value = grid[point[0]][point[1]];
  switch (value) {
    case ".":
      switch (direction) {
        case "w":
          if (point[1] - 1 >= 0) {
            dfs(direction, [point[0], point[1] - 1]);
          }
          break;
        case "n":
          if (point[0] - 1 >= 0) {
            dfs(direction, [point[0] - 1, point[1]]);
          }
          break;
        case "e":
          if (point[1] + 1 < grid[0].length) {
            dfs(direction, [point[0], point[1] + 1]);
          }
          break;
        case "s":
          if (point[0] + 1 < grid.length) {
            dfs(direction, [point[0] + 1, point[1]]);
          }
          break;
      }
      break;
    case "-":
      switch (direction) {
        case "w":
          if (point[1] - 1 >= 0) {
            dfs(direction, [point[0], point[1] - 1]);
          }
          break;
        case "e":
          if (point[1] + 1 < grid[0].length) {
            dfs(direction, [point[0], point[1] + 1]);
          }
          break;
        case "n":
        case "s":
          if (point[1] - 1 >= 0) {
            dfs("w", [point[0], point[1] - 1]);
          }
          if (point[1] + 1 < grid[0].length) {
            dfs("e", [point[0], point[1] + 1]);
          }
          break;
      }
      break;
    case "|":
      switch (direction) {
        case "w":
        case "e":
          if (point[0] - 1 >= 0) {
            dfs("n", [point[0] - 1, point[1]]);
          }
          if (point[0] + 1 < grid.length) {
            dfs("s", [point[0] + 1, point[1]]);
          }
          break;
        case "n":
          if (point[0] - 1 >= 0) {
            dfs(direction, [point[0] - 1, point[1]]);
          }
          break;
        case "s":
          if (point[0] + 1 < grid.length) {
            dfs(direction, [point[0] + 1, point[1]]);
          }
          break;
      }
      break;
    case "/":
      switch (direction) {
        case "w":
          if (point[0] + 1 < grid.length) {
            dfs("s", [point[0] + 1, point[1]]);
          }
          break;
        case "n":
          if (point[1] + 1 < grid[0].length) {
            dfs('e', [point[0], point[1] + 1]);
          }
          break;
        case "e":
          if (point[0] - 1 >= 0) {
            dfs('n', [point[0] - 1, point[1]]);
          }
          break;
        case "s":
          if (point[1] - 1 >= 0) {
            dfs("w", [point[0], point[1] - 1]);
          }
          break;
      }
      break;
    case "\\":
      switch (direction) {
        case "w":
          if (point[0] - 1 >= 0) {
            dfs('n', [point[0] - 1, point[1]]);
          }
          break;
        case "n":
          if (point[1] - 1 >= 0) {
            dfs('w', [point[0], point[1] - 1]);
          }
          break;
        case "e":
          if (point[0] + 1 < grid.length) {
            dfs('s', [point[0] + 1, point[1]]);
          }
          break;
        case "s":
          if (point[1] + 1 < grid[0].length) {
            dfs('e', [point[0], point[1] + 1]);
          }
          break;
      }
      break;
  }
}

dfs("e", [0, 0]);

console.log(calculateEnergized())

let res = 0
for(let i=0;i<grid.length;i++){
  visited = new Set()
  dfs('w', [i, 0])
  res = Math.max(res, calculateEnergized())
  visited = new Set()
  dfs('e', [i, grid[0].length - 1])
  res = Math.max(res, calculateEnergized())
}
for(let j=0;j<grid[0].length;j++){
  visited = new Set()
  dfs('s', [0, j])
  res = Math.max(res, calculateEnergized())
  visited = new Set()
  dfs('n', [grid.length - 1, j])
  res = Math.max(res, calculateEnergized())
}
console.log(res)

function calculateEnergized() {
  return new Set(Array.from(visited.values()).map(x => JSON.parse(x)).map(x => JSON.stringify(x[1]))).size;
}
