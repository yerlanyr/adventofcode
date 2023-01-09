const assert = require('assert')
const R = require('ramda')
const fs = require('fs')

function solution(input) {
  const parsedInput = parseInput(input)
  const indexedInput = R.indexBy(x => x[0], parsedInput)
  return solve(indexedInput, 'root')
}

function solve(indexInput, name) {
  const expr = indexInput[name][1]
  if(expr[0] == 'operation') {
    const a = solve(indexInput, expr[2])
    const b = solve(indexInput, expr[3])
    switch(expr[1]) {
      case '*' : return a * b
      case '+' : return a + b
      case '/' : return a / b
      case '-' : return a - b
    }
  } else if(expr[0] === 'number') {
    return expr[1]
  }
}

function parseInput(input) {
  return input.split('\n').map(x => {
    const y = x.split(':')
    const expr = y[1].trim().split(' ')
    if(expr.length == 1) {
      return [y[0], ['number', +expr]]
    } else {
      return [y[0], ['operation', expr[1], expr[0], expr[2]]]
    }
  })
}

assert.deepEqual(parseInput(`root: aaaa + bbbb
aaaa: 1
bbbb: 2`), [
  [
    'root',
    ['operation', '+', 'aaaa', 'bbbb']
  ],
  [
    'aaaa',
    ['number', 1]
  ],
  [
    'bbbb',
    ['number', 2]
  ]
])

assert.equal(solve({
  'root': ['root', ['number', 123]]
}, 'root'), 123)

assert.equal(solution(`root: pppw + sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
humn: 5
ljgn: 2
sjmn: drzm * dbpl
sllz: 4
pppw: cczh / lfqf
lgvd: ljgn * ptdq
drzm: hmdt - zczc
hmdt: 32`), 152)

assert.equal(solve({
  'root': ['root', ['operation', '+', 'aaaa', 'bbbb']],
  'aaaa': ['aaaa', ['number', 1]],
  'bbbb': ['bbbb', ['number', 2]],
}, 'root'), 3)

console.time('First part')
console.log('First part', solution(fs.readFileSync(__dirname + '/in.txt').toString()))
console.timeEnd('First part')

function secondpart(input) {
  const parsedInput = parseInput(input)
  const indexedInput = R.indexBy(x => x[0], parsedInput)
  const newLocal = reductionFunction(indexedInput, 'root', 'humn').slice(2)
  // now we need to do beta reduction instead to see that tree we have at the end.
  return reducingTermsFunction(...newLocal)
}

function reductionFunction(A, S, E) {
  if(S == E) {
    return S;
  }
  if(A[S][1][0] == 'number') {
    return A[S][1]
  } else if(A[S][1][0] == 'operation') {
    const a = reductionFunction(A, A[S][1][2], E);
    const b = reductionFunction(A, A[S][1][3], E);
    if(a[0] == b[0] && a[0] == 'number') {
      switch(A[S][1][1]) {
        case '+' :return ['number', a[1] + b[1]]
        case '*' :return ['number', a[1] * b[1]]
        case '/' :return ['number', a[1] / b[1]]
        case '-' :return ['number', a[1] - b[1]]
      }
    }
    return [A[S][1][0], A[S][1][1], a, b]
  }
}

function reducingTermsFunction(tree1, tree2) {
  // let's imagine that one the left hand side we have number tree and on the right hand side we have operation
  if(tree1[0] != 'operation' && tree2[0] != 'number') {
    // quick switcharoo
    return reducingTermsFunction(tree2, tree1)
  }
  // [operation, +, [number, x], [expr]]
  if(tree1[2][0] == 'number') {
    switch(tree1[1]) {
      case '+': {
        return reducingTermsFunction(tree1[3], [tree2[0], tree2[1] - tree1[2][1]])
      }
      case '*': {
        return reducingTermsFunction(tree1[3], [tree2[0], tree2[1] / tree1[2][1]])
      }
      case '-': {
        return reducingTermsFunction(['number', tree1[2][1] - tree2[1]], tree1[3])
      }
      case '/': {
        return reducingTermsFunction(['number', tree1[2][1] / tree2[1]], tree1[3])
      }
    }
  } else if(tree1[3][0] == 'number') {
    switch(tree1[1]) {
      case '+': {
        return reducingTermsFunction(tree1[2], [tree2[0], tree2[1] - tree1[3][1]])
      }
      case '*': {
        return reducingTermsFunction(tree1[2], [tree2[0], tree2[1] / tree1[3][1]])
      }
      case '/': {
        return reducingTermsFunction(tree1[2], [tree2[0], tree2[1] * tree1[3][1]])
      }
      case '-': {
        return reducingTermsFunction(tree1[2], [tree2[0], tree2[1] + tree1[3][1]])
      }
    }
  }
  return [tree1, tree2]
}
console.log('all assertion passed')
console.time('Second part')
console.log(JSON.stringify(secondpart(fs.readFileSync(__dirname + '/in.txt').toString())))
console.time('Second part')