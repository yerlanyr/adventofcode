// real aswer is for second part is : 100165128
export function intervalIntersects(a, b) {
  if (intervalCmp(a, b) > 0) {
    return intervalIntersects(b, a);
  }
  return pointInInterval(b[0], a) || pointInInterval(a[1], b);
}
export function subtractInterval(a, b) {
  const intervals = invertInterval(b);
  return intervals
    .filter((interval) => intervalIntersects(interval, a))
    .map((interval) => multiplyInterval(a, interval));
}
function intervalCmp(intervalA, intervalB) {
  if (intervalA[0] === intervalB[0])
    return intervalA[1] - intervalB[1];
  return intervalA[0] - intervalB[0];
}
export function multiplyInterval(a, b) {
  if (!intervalIntersects(a, b)) {
    throw Error('Multiplicatin error intervals doesn\'t intersect!', a, b, c, d);
  }
  let coords = [...a, ...b];
  coords.sort((a, b) => a - b);
  return coords.slice(1, 3);
}
export function shiftInterval([a, b], diff) {
  return [a + diff, b + diff];
}
export function toInterval([start, len]) {
  return [start, start + len - 1];
}
export function fromInterval(a, b) {
  return [a, b - a + 1];
}
export function joinIntervals([a, b], [c, d]) {
  return [Math.min(a, b, c, d), Math.max(a, b, c, d)];
}
export function sortAndJoin(intervals) {
  intervals.sort(intervalCmp);
  // join intervals using stack
  const joinedIntervals = [];
  for (let interval of intervals) {
    if (joinedIntervals.length === 0) {
      joinedIntervals.push(interval);
      continue;
    }
    if (intervalIntersects(interval, joinedIntervals[joinedIntervals.length - 1])) {
      const lastInterval = joinedIntervals.pop();
      joinedIntervals.push(joinIntervals(lastInterval, interval));
    } else {
      joinedIntervals.push(interval);
    }
  }
  return joinedIntervals;
}
export function pointInInterval(x, [a, b]) {
  return x >= a && x <= b;
}
export function invertInterval(a) {
  let res = [];
  if (a[0] !== 0) {
    res.push([0, a[0] - 1]);
  }
  res.push([a[1] + 1, Number.MAX_SAFE_INTEGER]);
  return res;
}
