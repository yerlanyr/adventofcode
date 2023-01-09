const fs = require('fs')
const R = require('ramda')
let contents = fs.readFileSync(__dirname + '/in.txt').toString()
let A = contents.split('\n').map(line => line.match(/(x|y)=\-?\d+/g).map(token => parseInt(token.split('=')[1])))
let targetY = 2_000_000
// First is find the crossings with the x and the line.
let xLeft = A[0][0], xRight = A[0][0]
let cnt = 0
let dis = (x,y,xx,yy) => Math.abs(x - xx) + Math.abs(y - yy)
for(let [x, y, xx, yy] of A) {
  let l = dis(x,y,xx,yy)
  if(l <= Math.abs(targetY - y)) {
    continue;
  }
  xLeft = Math.min(x - (l - Math.abs(targetY - y)), xLeft)
  xRight = Math.max(x + (l - Math.abs(targetY - y)), xRight)
}
for(let x = xLeft; x <= xRight; x++) {
  // check if not the same with As
  let intersects = false
  for(let a of A) {
    if(x == a[0] && targetY == a[1] || x == a[2] && targetY == a[3]) {
      intersects = true;
      break;
    }
  }
  if(intersects) { continue; }
  for(let a of A) {
    // check if item is close enough with any of points
    let l = Math.abs(x - a[0]) + Math.abs(targetY - a[1])
    let d = Math.abs(a[2] - a[0]) + Math.abs(a[3] - a[1])
    if(l <= d) {
      cnt++;
      break;
    }
  }
}
console.log('First part: ' + cnt)
let bs = [0, 4_000_000]
let tuningF = (x,y) => x * 4_000_000 + y
for(let x=bs[0];x<=bs[1];x++){
  for(let y=bs[0];y<=bs[1];y++){
    let intersects = false
    for(let a of A) {
      if(x == a[0] && y == a[1] || x == a[2] && y == a[3]) {
        intersects = true;
        break;
      }
    }
    if(intersects) { continue; }
    for(let a of A) {
      let l = Math.abs(x - a[0]) + Math.abs(y - a[1])
      let d = Math.abs(a[2] - a[0]) + Math.abs(a[3] - a[1])
      if(l <= d) {
        intersects = true
        // optimization
        y = a[1] + (d - Math.abs(x - a[0]))
        break;
      }
    }
    if(intersects) { continue; }

    console.log('Second part ', tuningF(x, y));
    break;
  }
}