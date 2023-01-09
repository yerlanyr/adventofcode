const fs = require('fs');

A = fs.readFileSync(__dirname + '/input.txt').toString().split('\n').map(x => x.split(' '))
let pos = [0, 0];
let deltas = {
  forward: [1, 0],
  down: [0, 1],
  up: [0, -1],
}
let aim = 0
const f = ([a,b], [c,d]) => [a+c, b+d]
const y = (s, [a,b]) => [a*s, b*s]
for(let [cmd, val] of A) {
  if(cmd == 'down') {
    aim += +val
  } else if(cmd === 'up') {
    aim -= +val
  } else if(cmd === 'forward') {
    pos = f(pos, [+val, +val * aim])
  }
}
console.log(pos[0] * pos[1])