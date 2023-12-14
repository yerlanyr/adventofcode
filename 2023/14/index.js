import { assocPath, difference, equals, transpose, zipWith, modifyPath, intersection, splitWhen, intersperse, unnest, reverse, pipe, map, o } from "ramda";
import { readFileSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import assert from "assert";

const input = readFileSync(dirname(fileURLToPath(import.meta.url)) + '/input.txt').toString()

let board = input.split('\n').map(x => x.split(''))

function tiltNorth(board) {
  let newBoard = transpose(board)
  newBoard = newBoard.map(x => moveToTheLeftOs(x))
  newBoard = transpose(newBoard)
  return newBoard
}

function tiltSouth(board) {
  let newBoard = transpose(board)
  newBoard = newBoard.map(x => reverse(x))
  newBoard = newBoard.map(x => moveToTheLeftOs(x))
  newBoard = newBoard.map(x => reverse(x))
  newBoard = transpose(newBoard)
  return newBoard
}

function tiltWest(board) {
  let nb = board.map(x => moveToTheLeftOs(x))
  return nb
}

function tiltEast(board) {
  let nb = board.map(x => moveToTheLeftOs(reverse(x)))
  nb = nb.map(x => reverse(x))
  return nb
}

function boardToString(board) {
  return board.map(x => x.join('')).join('\n')
}

board = tiltNorth(board)

const magnitude = computeMagnitutude(board)

function computeMagnitutude(board) {
  return board.reduce((agg, x, i) => agg + x.reduce((agg, y) => agg + (y === 'O' ? 1 : 0) * (board.length - i), 0), 0)
}

console.log(magnitude)

function moveToTheLeftOs(arr) {
  // counting sort for segments between hashes
  const segments = segment(arr)
  // console.log(segments)
  for(let segment of segments) {
    segment.sort((a,b) => b.charCodeAt(0) - a.charCodeAt(0))
  }
  return unnest(intersperse(['#'], segments))
}

function segment(arr) {
  const segments = []
  let buffer = []
  for(let x of arr) {
    if(x === '#') {
      segments.push(buffer)
      buffer = []
    } else {
      buffer.push(x)
    }
  }
  segments.push(buffer)
  return segments
}

// second part
// we need to run different tilts

// find cycle when tilts are same?
let states = new Map()

let cycleStart, cycleLen
for(let i=0;;i++) {
  const key = boardToString(board);
  // north, then west, then south, then east.
  if(states.has(key)) {
    console.log(states.get(key), i)
    cycleStart = states.get(key)
    cycleLen = i - cycleStart
    break;
  }
  states.set(key, i)
  board = tiltNorth(board)
  board = tiltWest(board)
  board = tiltSouth(board)
  board = tiltEast(board)
}

for(let i=0;i < (1000000000 - cycleStart) % cycleLen;i++) {
  board = tiltNorth(board)
  board = tiltWest(board)
  board = tiltSouth(board)
  board = tiltEast(board)
}
console.log(computeMagnitutude(board))