import assert from 'assert';
import { readFileSync } from 'fs';
import { dirname } from 'path';
import * as R from 'ramda';
import { fileURLToPath } from 'url';

const show = x => JSON.stringify(x)
const add = R.zipWith(R.add)
function solve(input) {
  const {map, instructions} = parseInput(input)
  const getVal = ([i,j]) => map[i][j]
  let direction = [0, 1]
  let coord = findLeftMost(map)
  for(const instruction of instructions) {
    if(instruction == 'R') {
      direction = turnRight(direction)
    } else if(instruction == 'L') {
      direction = turnLeft(direction)
    } else {
      const steps = +instruction
      for(let k=0;k<steps;k++) {
        let newCoord = add(coord, direction)
        if(
          newCoord[0] < 0 || 
          newCoord[0] >= map.length || 
          newCoord[1] < 0 || 
          newCoord[1] >= map[newCoord[0]].length || 
          getVal(newCoord) == ' '
        ) {
          newCoord = coord
          const backDirection = turnBack(direction);
          let possibleCoord
          const n = map.length
          const m = map[newCoord[0]].length
          function isValid([i, j]) {
            return i >= 0 && i < n && j >= 0 && j < m && map[i][j] != ' '
          }
          while(isValid(possibleCoord = add(newCoord, backDirection))) {
            newCoord = possibleCoord
          }
          if('#' === getVal(newCoord)) {
            break;
          }
          coord = newCoord
        } else if(getVal(newCoord) == '#') {
          break;
        } else if(getVal(newCoord) == '.') {
          coord = newCoord
        }
      }
    }
  }
  const directionToPrice = {
    [show([0, 1])]: 0,
    [show([1, 0])]: 1,
    [show([0, -1])]: 2,
    [show([-1, 0])]: 3,
  }
  console.log('Before return', coord, direction, directionToPrice[show(direction)])
  return 1000 * (1 + coord[0]) + 4 * (1 + coord[1]) + directionToPrice[show(direction)]
}

function turnRight(coord) {
  const [i, j] = coord;
  return [j, -i]
}

function turnLeft(coord) {
  const [i, j] = coord;
  return [-j, i]
}

function turnBack(coord) {
  const [i, j] = coord;
  return [-i, -j]
}

assert.deepEqual(turnRight([0, 1]), [1, 0])
assert.deepEqual(turnRight([1, 0]), [0, -1])
assert.deepEqual(turnRight([0, -1]), [-1, 0])
assert.deepEqual(turnRight([-1, 0]), [0, 1])

assert.deepEqual(turnLeft([1, 0]), [0, 1])
assert.deepEqual(turnLeft([0, -1]), [1, 0])
assert.deepEqual(turnLeft([-1, 0]), [0, -1])
assert.deepEqual(turnLeft([0, 1]), [-1, 0])

function findLeftMost(map) {
  let coord = []
  coord.push(map.findIndex(row => row.includes('.')))
  coord.push(map[coord[0]].findIndex(x => x == '.'))
  return coord
}

function parseInput(input) {
  let [map, instructions] = input.split('\n\n')
  map = input.split('\n').map(x => x.split(''))
  instructions = instructions.match(/(\d+)|[RL]/g)
  return {
    map, instructions
  }
}

assert.equal(solve(`        ...#
        .#..
        #...
        ....
...#.......#
........#...
..#....#....
..........#.
        ...#....
        .....#..
        .#......
        ......#.

10R5L5R10L4R5L5`), 6032)
console.time('First part')
console.log(
  solve(readFileSync(dirname(fileURLToPath(import.meta.url)) + '/in.txt').toString())
)
console.timeEnd('First part')