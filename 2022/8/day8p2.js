const fs = require('fs');

const contents = fs.readFileSync('./day8.txt').toString();
const A = contents.split('\n').map(line => line.split('').map(height => parseInt(height)));
const n = A.length
const m = A[0].length

let curMax = 0;
for(let i=0;i<n;i++){
  for(let j=0;j<m;j++){
    curMax = Math.max(scenicScore(i,j), curMax);
  }
}

function scenicScore(i, j) {
  let res = 1;
  let lj = j;
  for(let jj = j - 1; jj >= 0 ; jj--) {
    lj = jj
    if(A[i][j] <= A[i][jj]) {
      break;
    }
  }
  res *= j - lj;
  lj = j
  for(let jj = j + 1; jj < m; jj++) {
    lj = jj
    if(A[i][j] <= A[i][jj]) {
      break;
    }
  }
  res *= lj - j;
  let li = i
  for(let ii = i - 1; ii >= 0; ii--) {
    li = ii;
    if(A[i][j] <= A[ii][j]) {
      break;
    }
  }
  res *= i - li;
  li = i
  for(let ii = i + 1; ii < n; ii++) {
    li = ii
    if(A[i][j] <= A[ii][j]) {
      break;
    }
  }
  res *= li - i;
  return res;
}

console.log(curMax)