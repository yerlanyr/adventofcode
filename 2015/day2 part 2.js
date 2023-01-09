const fs = require('fs');
const input = fs.readFileSync('./2015day2.txt').toString();
//2*l*w + 2*w*h + 2*h*l + Math.min(l*w, Math.min(w*h, h*l))
const dimentions = input.split('\n').map(line => line.split('x').map(x => parseInt(x)))
let res = 0;
for(let [l,w,h] of dimentions) {
  const bow = l * w * h
  const perimeter = (l + w + h - Math.max(l, Math.max(w, h))) * 2
  res += bow + perimeter
}
console.log(res);