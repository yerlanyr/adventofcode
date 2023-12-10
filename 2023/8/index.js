import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

function solve(input) {
  const [instr, adj] = input.split('\n\n')
  console.log(instr)

  const adj2 = Object.fromEntries(adj.split('\n').map(x => {
    const [root, tail] = x.split(' = ')
    const lr = tail.match(/\w+/g)
    return [root, [lr[0], lr[1]]]
  }))

  // interate instructions until you find ZZZ
  let steps = 0
  // while(!flag)
  // for(let d of instr) {
  //   const idx = 'LR'.indexOf(d)
  //   cur = adj2[cur][idx]
  //   steps++
  //   if(cur === 'ZZZ') {
  //     flag = true
  //     console.log(steps)
  //   }
  // }
  // second part
  // simultaneous walks
  let curs = Object.keys(adj2).filter(x => x.endsWith('A'))
  // find cycles that will leave us on the instruction zero and on node zero
  const fls = curs.map(startNode => {
    let visited = new Set()
    let instrI = 0
    // follow instructions until you are on instrI === 0 and cur == startNode
    visited.add(`${startNode} ${instrI}`)
    let t = new Map()
    t.set(`${startNode} ${instrI}`, 0)
    let cur = adj2[startNode]['LR'.indexOf(instr[instrI])]
    instrI++
    let time = 1
    while(cur !== startNode || instrI !== 0) {
      if(visited.has(`${cur} ${instrI}`)) {
        const time0 = t.get(`${cur} ${instrI}`)
        const zs = Array.from(visited.values()).filter(x => x.split(' ')[0].endsWith('Z')).map(x => t.get(x))
        return [time0, zs[0], time]
      }
      visited.add(`${cur} ${instrI}`)
      t.set(`${cur} ${instrI}`, time)
      cur = adj2[cur]['LR'.indexOf(instr[instrI])]
      instrI = (instrI + 1) % instr.length
      time++
    }
    // here we know when the cycle loops.
  })
  // how to find where two lines intersect
  // find all times where
  console.log(fls.map(fls => fls[1]).reduce(lcm, fls[0][1]))
}

function gcd(a, b)
{
  if(a%b==0)
      return b;
  else
      return gcd(b,a%b);
}
function lcm(a,b) {
  return a * b / gcd(a,b)
}

solve(
  fs
    .readFileSync(dirname(fileURLToPath(import.meta.url)) + "/test.txt")
    .toString()
);
solve(
  fs
    .readFileSync(dirname(fileURLToPath(import.meta.url)) + "/index.txt")
    .toString()
);