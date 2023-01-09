const fs = require('fs');

const contents = fs.readFileSync('./day5.txt').toString();

const [stacks, instructions] = contents.split('\n\n')

console.log(stacks)
const stacksp = stacks.split('\n').map(x => x.split(''))
// transpose
let transposed = []
let longestRowLength = Math.max(...(stacksp.map(x => x.length)))
for(let j=0; j < longestRowLength; j++) {
  if(j >= transposed.length) {
    transposed.push([]);
  }

  for(let i=0; i < stacksp.length; i++) {
    transposed[j].push(stacksp[i][j])
  }
}
transposed = transposed.filter(row => !row.some(item => (item == '[' || item == ']')) && !row.every(item => item == ' '))
transposed = transposed.map(row => row.filter(item => item != ' '))
transposed.forEach(row => row.pop())
transposed.forEach(row => row.reverse())
const instructionsp = instructions.split('\n')
for(let instruction of instructionsp) {
  let [,amount, ,from, , to] = instruction.split(' ')
  from--;
  to--;
  const itermediate = []
  for(let i=0;i<amount;i++){
    itermediate.push(transposed[from].pop())
  }
  for(let i=0;i<amount;i++){
    transposed[to].push(itermediate.pop())
  }
}
let res = ''
for(let i=0;i<transposed.length;i++){
  res += transposed[i].at(-1)
}
console.log(res);
