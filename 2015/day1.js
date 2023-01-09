const fs = require('fs')
const input = fs.readFileSync('./2015day1.txt').toString();

let level = 0;

for(let i=0; i<input.length; i++) {
  const p = input[i];
  if(p === '(') {
    level++;
  } else if(p === ')') {
    level--;
  }
  if(level === -1) {
    console.log(i + 1);
    break;
  }
}

// console.log(level);
