const fs = require('fs')
const input = fs.readFileSync(__dirname + '/in.txt').toString().split('\n')
const R = require('ramda')

const frequencyMapper = (col) => {
  const reducer = ([ones, zeros], x) => x == '0' ? [ones, zeros + 1] : [ones + 1, zeros]
  return R.reduce(reducer, [0, 0], col)
}
const zipped = R.map(frequencyMapper, R.transpose(input))
const gammaMapper = ([ones, zeros]) => ones > zeros ? '1' : '0'
const gamma = R.join('', R.map(gammaMapper, zipped))
const epsilonMapper = ([ones, zeros]) => ones > zeros ? '0' : '1'
const epsilon = R.join('', R.map(epsilonMapper, zipped))
const res = parseInt(gamma, 2) * parseInt(epsilon, 2)
console.log('Stop')