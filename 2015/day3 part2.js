const fs = require('fs');
const path = require('path')
const input = fs.readFileSync(path.resolve(__dirname, './day3.txt')).toString();
// const input = fs.readFileSync(path.resolve(__dirname, './day3sample.txt')).toString();
const directions = ['^', 'v', '>', '<']
const deltas = [[-1, 0], [1, 0], [0, 1], [0, -1]]
function deltaFromDirecition(direction) {
  return deltas[directions.indexOf(direction)]
}
let coord = [0, 0];
let coordRobot = [0, 0];
function applyDelta(coord, delta) {
  return [coord[0] + delta[0], coord[1] + delta[1]]
}
let track = { 0: { 0: true }}
function visited(coord) {
  return track[coord[0]] && track[coord[0]][coord[1]]
}
let count = 1;
function markVisited(coord) {
  if(!track[coord[0]]) {
    track[coord[0]] = {}
  }
  track[coord[0]][coord[1]] = true;
}
for(let i=0; i<input.length; i+= 2) {
  coord = applyDelta(coord, deltaFromDirecition(input[i]))
  if(!visited(coord)) {
    markVisited(coord)
    count++;
  }
  if(i + 1 < input.length) {
    coordRobot = applyDelta(coordRobot, deltaFromDirecition(input[i+1]))
    if(!visited(coordRobot)) {
      markVisited(coordRobot)
      count++;
    }
  }
}
console.log(count)