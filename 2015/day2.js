const fs = require('fs');
const input = fs.readFileSync('./2015day2.txt').toString();
//2*l*w + 2*w*h + 2*h*l + Math.min(l*w, Math.min(w*h, h*l))
const dimentions = input.split('\n').map(line => line.split('x').map(x => parseInt(x)))
let res = 0;
for(let [l,w,h] of dimentions) {
  const a = l*w;
  const b = w*h;
  const c = h*l;
  const smallest = Math.min(a, Math.min(b, c))
  const area = 2 * a + 2 * b + 2 * c + smallest;
  console.log(a,b,c,smallest, area)
  res += area
}
console.log(res);