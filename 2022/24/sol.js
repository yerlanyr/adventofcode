import Queue from "yocto-queue";
import * as R from "ramda";

const addCoord = R.zipWith(R.add);

function solution(input) {
  // parse input
  const map = input.split("\n").map((x) => x.split(""));
  const n = map.length
  const m = map.at(0).length
  // Your expedition begins in the only non-wall position in the top row and needs to reach the only non-wall position in the bottom row.
  const A = [0, map[0].findIndex((x) => x == ".")];
  const B = [map.length - 1, map[map.length - 1].findIndex((x) => x == ".")];
  // BFS
  let Q = new Queue();
  let TQ = new Queue();
  // all initial blizzard points and direction
  let PointsAndDirection = []
  for(let i=0;i<n; i++ ) {
    for(let j=0;j<m;j++) {
      if('<>^v'.includes(map[i][j])) {
        PointsAndDirection.push([map[i][j], [i, j]])
      }
    }
  }
  const directionToDelta = {
    '<': [0, -1],
    '>': [0, 1],
    '^': [-1, 0],
    'v': [1, 0]
  }
  let step = 0;
  function isBlizzardHazzard(step, coord) {
    let deltas = [[-1, 0], [1, 0], [0, -1], [0, 1]]
    let directions = ['v', '^', '>', '<']
    for(let i=0;i<4;i++) {
      const delta = deltas[i]
      const [fi, fj] = wrapCoord(addCoord(coord, delta.map(x => x * step))) // 1, 2 -> 2, 2
      if(map[fi][fj] === directions[i]) {
        return true;
      }
    }
    return false;
    function wrapCoord([i, j]) { // 2 2
      return [wrapBy(i, n), wrapBy(j, m)]
      function wrapBy(i, n) {
        return (((i - 1) % (n - 2) + n - 2) % (n - 2) + 1)
      }
    }
  }
  function coordToBirds(step, coord) {
    let deltas = [[-1, 0], [1, 0], [0, -1], [0, 1]]
    let directions = ['v', '^', '>', '<']
    let count = 0;
    let lastBird = ''
    for(let i=0;i<4;i++) {
      const delta = deltas[i]
      const [fi, fj] = wrapCoord(addCoord(coord, delta.map(x => x * step))) // 1, 2 -> 2, 2
      if(map[fi][fj] === directions[i]) {
        lastBird = directions[i]
        count++
      }
    }
    if(map[coord[0]][coord[1]] == '#') {
      return '#'
    }
    if(count == 0) { 
      return '.'
    }
    return count == 1 ? lastBird : count
    function wrapCoord([i, j]) { // 2 2
      return [wrapBy(i, n), wrapBy(j, m)]
      function wrapBy(i, n) {
        return (((i - 1) % (n - 2) + n - 2) % (n - 2) + 1)
      }
    }
  }
  Q.enqueue([A, [A]]);
  while (Q.size || TQ.size) {
    if (!Q.size) {
      Q = TQ;
      TQ = new Queue();
      step++;
      console.log('Step', step);
      for(let i=0;i<n;i++){
        let line = ''
        for(let j=0;j<m;j++){
          line += coordToBirds(step, [i,j])
        }
        console.log(line)
      }
    }
    const [u, prevSteps] = Q.dequeue();
    if(JSON.stringify(u) === JSON.stringify(B)) {
      // we done!
      console.log('We done!', step + 1, JSON.stringify(prevSteps))
      break;
    }
    const adjDeltas = [
      [-1, 0],
      [0, -1],
      [0, 0],
      [0, 1],
      [1, 0],
    ];
    const isValid = ([i, j]) => {
      return i < map.length && i >= 0 && j < map[0].length && j >= 0;
    };
    
    for (let adjDelta of adjDeltas) {
      const adjCoord = addCoord(adjDelta, u);
      if (isValid(adjCoord) && 
        map[adjCoord[0]][adjCoord[1]] !== '#' &&
        !isBlizzardHazzard(step + 1, adjCoord)) {
        TQ.enqueue([adjCoord, [...prevSteps, adjCoord]]);
      }
    }
  }
}
console.time('First part')
solution(`#.######
#>>.<^<#
#.<..<<#
#>v.><>#
#<^v^^>#
######.#`);
console.timeEnd('First part')
// console.time('First part')
// solution(`#.######################################################################################################################################################
// #>.^v.>^v>><>>^>>v>v^>.<>^.>v^v>..<<><>>>v.><^<.>^.<^>^v^>>v<^>><.^<^.<v>v><><^^<^>>^<<<>.>.>^^^<^<^>.>^v.>.>^>^v<<^^<>><vv<><>>>v^.>^<vvv>.^>v.>.v<v.<#
// #<^^^><<vv<vv^^><>><>vv.vv<>vvvv<vv.>^>^>v^vvv>.<^>v<>>.<><<><>v<v^^<^.v^^><<><^><<.v.vv<<><.<<<<v^^>><^<><^<<<<.>v<^v<v>^>>>><.v>^>.>^<^>>v<v<^vv<v>v<#
// #>>>>^.>.^v>v<.^<^vv^^^<>.>>.>><<.v<v^><^><.<<<><.^v^^v<><v^v><vv<<v<..<<^<.<>^<^v.^>^<v^v.^<v>v<><>>>^v<v.^^<><>><>v<^v>>>^v<v^>v<^vvv><v>^><<><^v>>^>#
// #><<>^>v>.<^^v><v.<>v^<<<>^^v>^.v<<>><>v.v>v^.v>>>^<^><.>>v<<<>vv^.>^>^<><^.>.v^^<v<.^>^><>^<v>vv^v>v^<>><<vv>>>v^^<^v>>>v.<<>.v<><^^v<.^>v>.<^^><vv.^>#
// #<.v^vv^vv>><v>^>>^.vvv^^<v<.v^>><<>v<v<<^<<<vv.>><>v.^>vvv<v<v>^<>>v><.>^.>.^<<<.^vvv>^..^>>.v<v.^v^<^^<<^<^>^v>^v<vvv.v^^v<<<>^v<<<v><>v^<<^><.v>v<v>#
// #<^v^><>v^<.>vv>.^<<<vv^^<><^<^.^^<.^vv^>v^^.^<^>^.^<><><^<<>><vv<v^<>v<><>v^^v<.<v^<v>vvv>^>>^<^><>>^vv<^>><v><^.<<v><v.>^v^v>>>^<vv>v<^<><>.^^>.v><<>#
// #<.><^v>^<.>>v<v>v<^v^v.^>v<.v>.<vv>^>v<v<<>^^.<>.<.vvv<^>v^.^<^v>^.>.v<.v>><<<^vv^.^<<^<^v<v^^^>.><>v.^^.^><<.<vvvv<v><<^vv.<^^^^>^<.<><<>>^>v>.^^v.<<#
// #<<^.>v<><>.^>>^v<<^>vv<^v>><.<v^v^<<><v><^^.^^^>^.><^>v^v<<<<>>^>v>^v<^<>..v<.<v<><>v^>v^^v..<>^<><>^v<<v<<><<.v>...>^^v>.>v^.^>vv>^v<>v><<^.>^^..<<^<#
// #><v^<^..>>v<v.<>vvv>v<v^>>>.v^<^v<>.>^<.<<^<>.<..>.^.>^^>.^.^^>v.v^>v<^>^v.<v^>v^^^vv><^>^>>>v><v<>>>..v.<^<.<<<>>><^<<v>>^<.>^^^<><^<.<^>^<v.^>vv>vv>#
// #<><>v^..>v>^^^^<.v>v>..<>><^><<^v.v.<v^<v><><<<v>>>^^>>v<<>^^<^^^>v.<<>v^<v><v^<<v>>^v>>v><v^^>vv^<^v<^v^.><>vv>>>.>>v^<v^v>><^^v.^<v.><v^^<<<v^>>^v^>#
// #>v><>><<^.>v^.v<<<v><^vv<.v^>v<.>vv>v>>^<^<<><>v>v<v..v<^<.vvv<^>^^v<^.>.^^^>^^v.^.>^>>>^><v<.v<^^^^.v.vv<<vv<.>v<^>v^<<vv^v><v>v^>>v.^.^<<.vv>^^^<^v<#
// #<v^<>>^>>^..vv<^<<<v.v.^vv<.<^^<v^<.>^<.^.<<v^^^<^><>.>>>><^<>^>^v>><v^>v.<.^<v>^^>><><.>^v^>^<>^<^^.<^>^^^^^^vv<>vv^v^v>^v^<v<vv><<vv<^^^.>>^><<<.^>>#
// #<.<v^.>>><vv^.<^^^>>>.><v<v>^<>>.^^vv>>^<<<^v><^^<v<>>^^^^<v^<>^^>><^>v^<<>>v<^.>vvvv>>^<.^>.v<^^<<v>>.vv.v^v<>>>><^v^>>>.v.^^v<<v>v^^>^v>^v<><.v><^v.#
// #><<^v><<<.v<^^><^v<^v.<<<.^^.v>vvvv>^>><^^v<>.<>><<.v^>..^<>.><^>^>^v^^>v<<vv>^>vvv.>^^>^^<<>v>v^>^^^<^v>.v>^<><^<.v<^><<>^.^>>><<v^>v^v^v<^v>>^^^><^<#
// #<^>v<>.>>^.v>^<v><>.v.^^v>^<..v.^>^>.v>>><vv^<>^^>v><>vv.<v<v^vv<.^vv<><v>>>^v><v^vvvvv.<vv>>^v<<.v>v^>v><<<^.<<<<>vv>^>>^<>^^<vvv^<vvvvvv><^^<<<>^^<>#
// #>>.>>.^>..<^<^.<<v<><>..^^<..v<.><^^<v.v^v><>^vv<v<^v<^>.v<vvvv><<<>^>^v^>v<>><vv^v<>>>>>v<v<>^.>><v<v.>><v<v^^<v.<><.<>^^^^v<<^>>.><<.><.v^^..>>>.v>>#
// #>v<v^^<^vvv.>^<>>v^v.vv^>v^vvvvv<>.v^.v<.><>^>>^<<v<^^v>v><^.>>^><>v<vv>v<<^>^>^.<v>vv<<>^^>^<<>v><v>.<<^.<>><<^<<.^<^<<<.^>.<.vv>v^v<^>vvv>^v<<<<v<<<#
// #<^<>v^.^<><>^<>^>v<v.^v..v..vv^.<.^^>^>^><.vv>>.<^..^^^<^<.^^<^^v^<^.<<<<<v<^<<><v>^v.<<>.^>><^>^v>><<v<>^v^<<^>>v<<^.v<<^vv>>v>^.v^^^<><vv^^<<>.v.<><#
// #..vv<v><^vv>.v<v<^v><vvv>.v>^v^>>vv^.^>v.v^^<<>^^<>^<^^>.<^v<v>^>^<v<<v<>v<^^^>v>><><<><.<<><^<v<<>v^^>>v><>^v^.v>^^v<^><><^v<^<vv.vvv><><<>v<<><>v<.>#
// #>>.<^^>><<<^>v<^^>>^<<>><<.<^^^<^^^<^<v<^<<^><<v<v<^^>vv<<^v>.^<^^>><>^^^.>v>v^<^>>v><<^<^^^>v><<>^^v><>v..<.^^>..vv.<v>>>^<<v^<v^^v>>>>.>vv.>>^v>^v<.#
// ######################################################################################################################################################.#`);
// console.timeEnd('First part')