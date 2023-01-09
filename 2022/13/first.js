const fs = require('fs');
const { cmp } = require("./cmp");

const input = fs.readFileSync(__dirname + '/in.txt').toString()
  .split('\n\n')
  .map(l => 
    l.split('\n')
      .map(l => JSON.parse(l))
  )

let res = 0;

for(let i=0;i<input.length;i++) {
  if(cmp(input[i][0], input[i][1]) != -1) {
    res += i+1
  }
}
console.log(res);