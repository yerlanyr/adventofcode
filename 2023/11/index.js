import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { sum, transpose, zipWith } from 'ramda'

const input = fs.readFileSync(dirname(fileURLToPath(import.meta.url)) + '/test.txt').toString()
solve(input)
const input2 = fs.readFileSync(dirname(fileURLToPath(import.meta.url)) + '/input.txt').toString()
solve(input2)

function solve(input) {
  let lines = input.split('\n')
  let emptyLines = new Set(lines.map((line, i) => [line, i]).filter(([line, i]) => /^[.]+$/.test(line)).map(x => x[1]))
  let emptyCols = new Set(transpose(lines).map((line, i) => [line, i]).filter(([line, i]) => line.every(x => x === '.')).map(x => x[1]))
  let galaxyCoords = []
  for(let i=0;i<lines.length;i++){
    for(let j=0;j<lines[0].length;j++){
      if(lines[i][j] === '#') {
        galaxyCoords.push([i, j])
      }
    }
  }
  // shift the rows by multiplier if empty
  galaxyCoords = shiftByMultiplier(galaxyCoords, 1000000)
  function shiftByMultiplier(coords, multiplier) {
    let emptyLines = lines.map((line, i) => [line, i]).filter(([line, i]) => /^[.]+$/.test(line)).map(x => x[1])
    let emptyCols = transpose(lines).map((line, i) => [line, i]).filter(([line, i]) => line.every(x => x === '.')).map(x => x[1])
    // now i wanna find the amount of empty lines prior to this line
    return coords.map(u => {
      let li = -1
      for(let step = emptyLines.length >> 1; step > 0; step >>= 1) {
        while(li + step < emptyLines.length && emptyLines[li + step] < u[0]) {
          li = li + step
        }
      }
      let ci = -1
      for(let step = emptyCols.length >> 1; step > 0; step >>= 1) {
        while(ci + step < emptyCols.length && emptyCols[ci + step] < u[1]) {
          ci = ci + step
        }
      }
      li++
      ci++
      return [u[0] + (multiplier - 1) * li, u[1] + (multiplier - 1) * ci]
    })
  }
  let augLines = []
  for(let i=0;i<lines.length;i++){
    let times = 1
    if(emptyLines.has(i)) {
      // insert row twice
      times = 2
    }
    for(let k = 0; k < times; k++) {
      let line = []
      for(let j=0;j<lines[i].length;j++){
        line.push(lines[i][j])
        if(emptyCols.has(j)) {
          line.push(lines[i][j])
        }
      }
      augLines.push(line)
    }
  }

  let res = 0
  for(let i=0; i<galaxyCoords.length;i ++) {
    const u = galaxyCoords[i]
    for(let j=i+1;j<galaxyCoords.length;j++) {
      const v = galaxyCoords[j]
      const distance = sum(zipWith((a,b) => Math.abs(a - b), u, v))
      res += distance
    }
  }
  
  console.log(res)
}