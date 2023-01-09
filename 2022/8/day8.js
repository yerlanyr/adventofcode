const fs = require('fs');

const contents = fs.readFileSync('./day8.txt').toString();
const A = contents.split('\n').map(line => line.split('').map(height => parseInt(height)));
const n = A.length
const m = A[0].length
const M1 = new Array(A.length).fill(0).map(x => new Array(m).fill(true))
const M2 = new Array(A.length).fill(0).map(x => new Array(m).fill(true))
const M3 = new Array(A.length).fill(0).map(x => new Array(m).fill(true))
const M4 = new Array(A.length).fill(0).map(x => new Array(m).fill(true))

for(let i=0; i < n;i++){
  let max = A[i][0];
  for(let j=1;j<m;j++){
    if(A[i][j] > max) {
      max = A[i][j];
    } else {
      M1[i][j] = false
    }
  }
}
for(let i=0;i<n;i++) {
  let max = A[i][m-1];
  for(let j=m - 2; j >=0;j--) {
    if(A[i][j] > max) {
      max = A[i][j];
    } else {
      M2[i][j] = false
    }
  }
}
for(let j=0;j<m;j++){
  let max = A[0][j];
  for(let i=1;i<n;i++){
    if(A[i][j] > max) {
      max = A[i][j];
    } else {
      M3[i][j] = false
    }
  }
}
for(let j=0;j<m;j++) {
  let max = A[n-1][j];
  for(let i=n - 2; i >=0;i--) {
    if(A[i][j] > max) {
      max = A[i][j];
    } else {
      M4[i][j] = false
    }
  }
}
let count = 0;
for(let i=0;i<n;i++){ 
  for(let j=0;j<m;j++){
    if(M1[i][j] || M2[i][j] || M3[i][j] || M4[i][j]) {
      count++;
    }
  }
}
console.log(count);