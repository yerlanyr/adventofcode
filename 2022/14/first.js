const fs = require('fs')
const input = fs.readFileSync(__dirname + '/in.txt').toString()
  .split('\n')
  .map(line => line.split(' -> ').map(x => x.split(',').map(x => +x)))
// generate all the intermediate points in the chart to the grid.
const points = {}
const sign = (a, b) => a > b ? -1 : 1
const markCoord = (x,y) => {
  if(!points[x]) {
    points[x] = {}
  }
  points[x][y] = true
}
const hasPoint = (x,y) => {
  return points[x] && points[x][y]
}
for(let line of input) {
  for(let i=1, j=0;i<line.length;i++, j++) {
    for(let x = line[j][0]; sign(line[j][0], line[i][0]) == 1 ? x <= line[i][0] : x >= line[i][0]; x += sign(line[j][0], line[i][0])) {
      markCoord(x, line[j][1])
    }
    for(let x = line[j][1]; sign(line[j][1], line[i][1]) == 1 ? x <= line[i][1] : x >= line[i][1]; x += sign(line[j][1], line[i][1])) {
      markCoord(line[j][0], x)
    }
  }
}
// sand production
let generating = true;
let k = 0;
while(generating) {
  // generate snow at 500, 0
  // in column 500 
  let currentCoords = [500, 0]
  if(hasPoint(500, 0)) {
    break;
  }
  let sliding = true;
  // while sliding
  while(sliding) {
    // find first obstacle
    if(!points[currentCoords[0]]) {
      generating = false;
      break;
    }
    let obstacles = Object.keys(points[currentCoords[0]])
    if(obstacles.length == 0) {
      console.log('fell to abbyss')
      generating = false;
      break;
    }
    // ok
    obstacles.sort((a,b) => a - b)
    let collisionObject = obstacles.find((y) => currentCoords[1] < y)
    if(!collisionObject) {
      // fall man
      generating = false;
      break;
    }
    currentCoords[1] = collisionObject - 1
    // slate to the left?
    if(!hasPoint(currentCoords[0] - 1, collisionObject)) {
      currentCoords = [currentCoords[0] - 1, collisionObject]
      continue
      // slate to the right
    } else if(!hasPoint(currentCoords[0] + 1, collisionObject)) {
      currentCoords = [currentCoords[0] + 1, collisionObject]
      continue
    }
    // stay where you are!
    k++
    markCoord(...currentCoords)
    // // render all the items there
    // for(let j=0; j<10;j++){
    //   let out = j + ' '
    //     for(let i=494; i<504;i++) {
    //     out += hasPoint(i,j) ? '#' : '.'
    //   }
    //   console.log(out);
    // }
    // console.log('')
    break;
  }
}
console.log(k);