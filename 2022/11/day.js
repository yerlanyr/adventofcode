const fs = require('fs');

const A = fs.readFileSync(__dirname + '/in.txt').toString()
  .split('\n\n')
  .map(mon => mon.split('\n'))

const M = []

for(let m of A) {
  // items
  const items = m[1].split(':')[1].split(',').map(x => parseInt(x.trim()))
  const operation = m[2].split(':')[1].split('=')[1].match(/old|\d+|[\+\*]/g).map(t => /\d+/.test(t) ? +t : t)
  const divisibleBy = +m[3].split(':')[1].split(' ').filter(x => x)[2]
  const trueOp = +m[4].split(':')[1].split(' ').filter(x => x)[3]
  const falseOp = +m[5].split(':')[1].split(' ').filter(x => x)[3]
  M.push({
    items,
    operation,
    divisibleBy,
    trueOp,
    falseOp,
    inspected: 0
  })
}

// manageble levels
const c = M.reduce((a, m) => a * m.divisibleBy, 1)

for(let i = 0; i < 10000; i++) {
  // console.log('round ' + i)
  for(let j=0; j < M.length; j++) {
    let monkey = M[j]
    // console.log('monkey ' + j)
    for(let item of monkey.items) {
      // inspects item
      monkey.inspected++;
      // applyOperation
      let level = item
      let a = monkey.operation[0] == 'old' ? item : monkey.operation[0], 
        b = monkey.operation[2] == 'old' ? item : monkey.operation[2];
      
      if(monkey.operation[1] == '*') {
        level = a * b
      } else {
        // +
        level = a + b
      }
      // console.log('level : ' + level)
      level = level % c;
      // console.log('level 2 : ' + level)
      // test
      const divisible = level % monkey.divisibleBy == 0;
      // console.log('divis ', divisible)
      // throw 
      if(divisible) {
        M[monkey.trueOp].items.push(level)
      } else {
        M[monkey.falseOp].items.push(level)
      }
    }
    monkey.items = [];
  }
  // console.log('After round:')
  // for(let m of M) {
  //   console.log('monkey', m.items.toString());
  // }
}
let B = M.map(m => m.inspected)
B.sort((a,b) => b - a)
console.log(B.at(1) * B.at(0))
// for(let m of M) {
//   console.log(m.inspected)
// }
