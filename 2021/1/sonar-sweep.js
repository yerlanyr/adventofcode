const fs = require('fs');

A = fs.readFileSync(__dirname + '/input.txt').toString().split('\n').map(x => parseInt(x))
let res = 0;
let prevSum = 0;
for(let i=0;i + 2 < A.length;i++) {
  let sum = 0;
  for(let j = i; j < i + 3; j++) {
    sum += A[j]
  }
  if(i > 0) {
    if(sum > prevSum) {
      res++;
    }
  }
  prevSum = sum
}

console.log(res);
