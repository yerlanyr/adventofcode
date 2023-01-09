const fs = require('fs')

const A = fs.readFileSync(__dirname + '/in.txt').toString().split('\n').map(x => parseInt(x))

function shift(A, value) {
  const i = A.indexOf(value)
  const newIndex = (i + A[i] % A.length + A.length) % A.length
  for(let j = Math.min(i, newIndex); j < Math.max(i, newIndex); j++) {
    const temp = A[j]
    A[j] = A[j+1]
    A[j + 1] = temp
  }
}

const B = A.slice()
for(let i=0;i<A.length;i++){
  shift(A, B[i])
  console.log(A.toString())
}