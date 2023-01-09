const fs = require("fs");
const A = fs
  .readFileSync(__dirname + "/in.txt")
  .toString()
  .split("\n");
const B = new Array(A.length).fill(0).map(() => new Array(A[0].length).fill('.'))
// find starting point.
const S = findPoint("E");
// Find ending point
const E = findPoint("E");

function findPoint(l) {
  const i = A.findIndex((line) => line.includes(l));
  const j = A[i].indexOf(l);
  return [i, j];
}
function node(val, next) {
  return {
    val, next
  }
}
function createQueue() {
  let head = node(-1, null)
  let tail = head;
  let len = 0;

  return {
    getLen() {return len},
    enqueue(val) {
      len++;
      tail = tail.next = node(val)
    },
    dequeue() {
      len--;
      const next = head.next
      head.next = head.next.next
      return next.val
    }
  }
}

let queue = createQueue();
let nextQueue = createQueue()
queue.enqueue(S);
visited = {}
let len = 0
while (queue.getLen() || nextQueue.getLen()) {
  if(queue.getLen() == 0) {
    queue = nextQueue
    nextQueue = createQueue()
    len++;
  }
  const u = queue.dequeue();
  if(visited[u[0]] && visited[u[0]][u[1]]) continue;
  if(!visited[u[0]]) {
    visited[u[0]] = {}
  }
  visited[u[0]][u[1]] = true
  // check if we came to E
  if(A[u[0]][u[1]] == 'a') {
    console.log('Found')
    break;
  }
  // vs
  const ds = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const dstol = new Map()
  dstol.set(ds[0], '>')
  dstol.set(ds[1], '<')
  dstol.set(ds[2], 'v')
  dstol.set(ds[3], '^')

  for (let d of ds) {
    let v = [u[0] + d[0], u[1] + d[1]];
    if (!A[v[0]]) continue;
    if (!A[v[0]][v[1]]) continue;
    let nextLetter = normalize(A[v[0]][v[1]]).charCodeAt(0)
    let letter = normalize(A[u[0]][u[1]]).charCodeAt(0);
    let diff = Math.abs(nextLetter - letter)
    if(diff > 1) continue;
    if(visited[v[0]] && visited[v[0]][v[1]]) continue;
    B[v[0]][v[1]] = dstol.get(d)
    nextQueue.enqueue(v)
  }
}

function normalize(l) {
  if (l === "S") l = "a";
  if (l === "E") l = "z";
  return l;
}
console.log(len)

console.log(B.map(x => x.join('')).join('\n'))