const fs = require('fs')
const { off } = require('process')
const A = fs.readFileSync(__dirname + '/i.txt').toString().split('\n').map(x => x.split(' ')).map(([a,b]) => [a, +b])

const v = {
  0: {0: true}
}
let cnt = 1;
const ds = {
  'R': [0, 1],
  'L': [0, -1],
  'U': [1, 0],
  'D': [-1, 0]
}
let ks = new Array(8).fill(0).map(x => [0, 0])
let h = [0, 0]
let t = [0, 0]
const f = ([a,b],[aa,bb]) =>[a+aa, b+bb]
const sign = x => x > 0 ? 1 : -1
// delta from h and t where tails wants to move
const b = ([a,b], [aa,bb]) => {
  const d = Math.abs(a - aa) + Math.abs(b - bb)
  if(d == 0 || d == 1 || d == 2 && (a != aa && b != bb)) {
    return [0, 0]
  }
  if(a == aa) {
    return [0, sign(b - bb)]
  }
  if(b == bb) {
    return [sign(a - aa), 0]
  }
  return [sign(a - aa), sign(b - bb)]
}
for(let [c, x] of A) {
  for(let i=0;i<x;i++){
    let d = ds[c]
    h = f(d, h)
    for(let i=0;i<ks.length;i++){
      if(i == 0) {
        d = b(h, ks[0])
      } else {
        d = b(ks[i-1], ks[i])
      }
      ks[i] = f(d, ks[i])
    }
    d = b(ks.at(-1), t)
    t = f(d, t)
    if(!v[t[0]]) {
      v[t[0]] = {}
    }
    if(!v[t[0]][t[1]]) {
      cnt++; 
    }
    v[t[0]][t[1]] = true;
  }
}
console.log(cnt);