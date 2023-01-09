const fs = require('fs');
const assert = require('assert');
const R = require('ramda')
const input = fs.readFileSync(__dirname + '/in.txt').toString();
function solution(input) {
  const A = makeCoords(input.split('\n').map(x => x.split('')))

  function makeCoords(A) {
    const result = []
    for(let i=0;i<A.length;i++) {
      for(let j=0;j<A[0].length;j++){
        if(A[i][j] == '#') {
          result.push({i, j})
        }
      }
    }
    return result;
  }

  function toKey(coord) {
    return coord.i + ' ' + coord.j
  }
  function fromKey(key) {
    const [i, j] = key.split(' ').map(x => parseInt(x))
    return {
      i, j
    }
  }

  const LookUp = new Set()

  for(let coord of A) {
    LookUp.add(toKey(coord))
  }

  function getDirectionsToConsider(index) {
    const directions = ['N', 'S', 'W', 'E']
    const startingIndex = index % directions.length
    const firstPart = directions.slice(0, startingIndex)
    const secondPart = directions.slice(startingIndex)
    firstPart.reverse()
    secondPart.reverse()
    const result = firstPart.concat(secondPart)
    result.reverse()
    return result
  }

  const letterToCoord = {
    'N': {i: -1, j: 0},
    'S': {i: 1, j: 0},
    'E': {i: 0, j: 1},
    'W': {i: 0, j: -1},
  }

  const AMOUNT_OF_ROUNDS = 10

  function addCoords(a, b) {
    return {
      i: a.i + b.i,
      j: a.j + b.j
    }
  }

  function leftAdj(p, direction) {
    const delta = { i: direction.i - direction.j ,j: direction.i + direction.j }
    return addCoords(p, delta)
  }
  function rightAdj(p, direction) {
    const delta = { i: direction.i + direction.j , j: direction.j - direction.i }
    return addCoords(p, delta)
  }

  const adjDeltas = [
    {i: -1, j: -1},
    {i: -1, j: 0},
    {i: -1, j: 1},
    {i: 0, j: -1},
    {i: 0, j: 1},
    {i: 1, j: -1},
    {i: 1, j: 0},
    {i: 1, j: 1},
  ]

  for(let round = 0; round < AMOUNT_OF_ROUNDS; round++) {
    const directions = getDirectionsToConsider(round)
    const nextMoves = new Map() // { coord_key: elv_coord[]}
    LookUp.forEach((value) => {
      const coord = fromKey(value)
      // check if elf does not have any adj
      if(adjDeltas.every(adjDelta => !LookUp.has(toKey(addCoords(coord, adjDelta))))) {
        return
      }
      // propose the movement for the coord.
      for(let direction of directions) {
        const directionCoord = letterToCoord[direction]
        // elf at coord tries to consider direction
        const nextCoord = addCoords(directionCoord, coord)
        const adjCoords = [nextCoord,leftAdj(coord, directionCoord), rightAdj(coord, directionCoord)]

        if(adjCoords.every(adjCoord => !LookUp.has(toKey(adjCoord)))) {
          // we need to say that this is our next position
          const nextCoordKey = toKey(nextCoord)
          if(!nextMoves.has(nextCoordKey)) {
            nextMoves.set(nextCoordKey, [])
          }

          nextMoves.get(nextCoordKey).push(coord)
          break;
        }
      }
    })
    // now we need to process all the next moves we got
    nextMoves.forEach((value, key) => {
      const nextCoord = fromKey(key)
      if(value.length == 1) {
        const prevCoord = value[0]
        LookUp.delete(toKey(prevCoord))
        LookUp.add(toKey(nextCoord))
      }
    })
  }
  // let's cound empty cells withing the coords of elves
  // render?
  function countEmpty() {
    const coords = Array.from(LookUp.values()).map(x => fromKey(x))
    const minI = Math.min(...coords.map(x => x.i))
    const maxI = Math.max(...coords.map(x => x.i))
    const minJ = Math.min(...coords.map(x => x.j))
    const maxJ = Math.max(...coords.map(x => x.j))
    let count = 0
    for(let i=minI; i<=maxI; i++) {
      for(let j=minJ; j<=maxJ;j++) {
        if(!LookUp.has(toKey({i, j}))){
          count++
        }
      }
    }
    return count
  }
  console.log(countEmpty())
}
console.time('First part')
solution(input)
console.timeEnd('First part')
function solution2(input) {
  const A = makeCoords(input.split('\n').map(x => x.split('')))

  function makeCoords(A) {
    const result = []
    for(let i=0;i<A.length;i++) {
      for(let j=0;j<A[0].length;j++){
        if(A[i][j] == '#') {
          result.push({i, j})
        }
      }
    }
    return result;
  }

  function toKey(coord) {
    return coord.i + ' ' + coord.j
  }
  function fromKey(key) {
    const [i, j] = key.split(' ').map(x => parseInt(x))
    return {
      i, j
    }
  }

  const LookUp = new Set()

  for(let coord of A) {
    LookUp.add(toKey(coord))
  }

  function getDirectionsToConsider(index) {
    const directions = ['N', 'S', 'W', 'E']
    const startingIndex = index % directions.length
    const firstPart = directions.slice(0, startingIndex)
    const secondPart = directions.slice(startingIndex)
    firstPart.reverse()
    secondPart.reverse()
    const result = firstPart.concat(secondPart)
    result.reverse()
    return result
  }

  const letterToCoord = {
    'N': {i: -1, j: 0},
    'S': {i: 1, j: 0},
    'E': {i: 0, j: 1},
    'W': {i: 0, j: -1},
  }

  function addCoords(a, b) {
    return {
      i: a.i + b.i,
      j: a.j + b.j
    }
  }

  function leftAdj(p, direction) {
    const delta = { i: direction.i - direction.j ,j: direction.i + direction.j }
    return addCoords(p, delta)
  }
  function rightAdj(p, direction) {
    const delta = { i: direction.i + direction.j , j: direction.j - direction.i }
    return addCoords(p, delta)
  }

  const adjDeltas = [
    {i: -1, j: -1},
    {i: -1, j: 0},
    {i: -1, j: 1},
    {i: 0, j: -1},
    {i: 0, j: 1},
    {i: 1, j: -1},
    {i: 1, j: 0},
    {i: 1, j: 1},
  ]
  let round = 0
  for(; true; round++) {
    let moves = 0;
    const directions = getDirectionsToConsider(round)
    const nextMoves = new Map() // { coord_key: elv_coord[]}
    LookUp.forEach((value) => {
      const coord = fromKey(value)
      // check if elf does not have any adj
      if(adjDeltas.every(adjDelta => !LookUp.has(toKey(addCoords(coord, adjDelta))))) {
        return
      }
      // propose the movement for the coord.
      for(let direction of directions) {
        const directionCoord = letterToCoord[direction]
        // elf at coord tries to consider direction
        const nextCoord = addCoords(directionCoord, coord)
        const adjCoords = [nextCoord,leftAdj(coord, directionCoord), rightAdj(coord, directionCoord)]

        if(adjCoords.every(adjCoord => !LookUp.has(toKey(adjCoord)))) {
          // we need to say that this is our next position
          const nextCoordKey = toKey(nextCoord)
          if(!nextMoves.has(nextCoordKey)) {
            nextMoves.set(nextCoordKey, [])
          }

          nextMoves.get(nextCoordKey).push(coord)
          break;
        }
      }
    })
    // now we need to process all the next moves we got
    nextMoves.forEach((value, key) => {
      const nextCoord = fromKey(key)
      if(value.length == 1) {
        const prevCoord = value[0]
        LookUp.delete(toKey(prevCoord))
        LookUp.add(toKey(nextCoord))
        moves++
      }
    })
    if(moves == 0) break;
  }
  console.log(round + 1)
}
console.time('SecondPart')
solution2(input)
console.timeEnd('SecondPart')