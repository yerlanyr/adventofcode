import { readFileSync } from 'fs'
import { dirname } from 'path'
import { dropLast } from 'ramda'
import { fileURLToPath } from 'url'

const input = readFileSync(dirname(fileURLToPath(import.meta.url)) + '/in.txt').toString()

function hash(str) {
  let res = 0
  for(let l of str) {
    res += l.charCodeAt(0)
    res *= 17
    res %= 256
  }
  return res;
}

console.log(input.split(',').reduce((agg, cur) => agg + hash(cur), 0))

console.log(hash('rn'))
console.log(hash('cm'))

// assumption that when it is more we just replace the number not the ph
const table = Array.from({length: 256}, () => [])

for(let instruction of input.split(',')) {
  // instruction is ends with -
  // instruction has =
  if(instruction.endsWith('-')) {
    const key = dropLast(1, instruction)
    // remove with the key
    const h = hash(key)
    table[h] = table[h].filter(([keyb]) => key !== keyb)
  } else {
    const [key, val] = instruction.split('=')
    const h = hash(key)
    const entry = table[h].find(([keyb]) => keyb === key)
    if(entry) {
      entry[1] = val
    } else {
      table[h].push([key, val])
    }
  }
}
// compute the focusing power
console.log(table.reduce((agg, cur, bidx) => {
  return agg + cur.reduce((agg, [key, val], idx) => {
    return agg + (bidx  +1) * (idx + 1) * (+val)
  }, 0)
}, 0))