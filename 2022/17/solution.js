const fs = require('fs')
const R = require('ramda')
const shapes = `####

.#.
###
.#.

..#
..#
###

#
#
#
#

##
##`.split('\n\n')
  .map(x => R.reverse(x.split('\n'))
    .flatMap((line, i) => 
      line.split('')
        .map((letter, i) => [letter == '#', i])
        .filter(([isHash]) => isHash)
        .map(([,j]) => [BigInt(i), j])
    )
  )
const transposePoint = ([y, x], [dy, dx]) => [y + dy, x + dx]
const transpose = (shape, delta) => {
  return shape.map(point => transposePoint(point, delta))
}
const w = 7
const outOfBounds = (shape) => {
  return shape.some(([y, x]) => x < 0 || x >= w || y < 0)
}
function solve(input, upperLimit) {
  let possibleLoop = shapes.length * input.length
  let h = -1n
  let cyclicH;
  let k = 0
  // trie
  const fallenRocksTrie = new Map()
  const pushToTrie = (shape) => {
    for(let point of shape) {
      if(!fallenRocksTrie.has(point[0])) fallenRocksTrie.set(point[0], new Set())
      fallenRocksTrie.get(point[0]).add(point[1])
    }
  }
  const hasInTrie = (point) => {
    return fallenRocksTrie.has(point[0]) && fallenRocksTrie.get(point[0]).has(point[1])
  }
  const colliding = (ps) => ps.some(p => hasInTrie(p))
  for (let i=0n;i<upperLimit;i++) {
    // transpose the shape to the height of 3 from h
    const sI = i % BigInt(shapes.length);
    let s = transpose(shapes[sI], [h + 4n, 2])
    while(true) {
      // get the jet direction
      let jetDirection = input[k]
      k = (k + 1) % input.length
      //console.log('Jet direction is: ', jetDirection)
      let delta = jetDirection == '>' ? [0n, 1] : [0n, -1];
      const possibleShape = transpose(s, delta)
      if(!outOfBounds(possibleShape) && !colliding(possibleShape)) {
        s = possibleShape
      }
      // try to fall down
      const possibleShape2 = transpose(s, [-1n, 0])
      if(!outOfBounds(possibleShape2) && !colliding(possibleShape2)) {
        s = possibleShape2
      } else {
        // stop falling and register the points to fallenRocks
        pushToTrie(s)
        // register the new lower ground in h
        for(let [y, x] of s) {
          if(y > h) {
            h = y
          }
        }
        
        break;
      }
    }
  }
  console.log(h + 1n)
}
// console.log('First part for sample:')
// solve(fs.readFileSync(__dirname + '/sample.txt').toString(), 2022n)
// console.log('First part for actual:')
// solve(fs.readFileSync(__dirname + '/in.txt').toString(), 2022n)
// console.log('Second part for sample:')
// solve(fs.readFileSync(__dirname + '/sample.txt').toString(), 1000_000_000_000n)
console.log('Second part for actual:')
solve(fs.readFileSync(__dirname + '/in.txt').toString(), 1000_000_000_000n)
