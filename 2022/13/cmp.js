function cmp(p1, p2) {
  // undefined lvl
  if (p1 === undefined && p2 === undefined) {
    return 0;
  }
  if (p1 === undefined) {
    return 1;
  }
  if (p2 === undefined) {
    return -1;
  }
  // ints
  if (Number.isInteger(p1) && Number.isInteger(p2)) {
    return p1 < p2 ? 1 : (p1 == p2 ? 0 : -1);
  }
  // one of them is not list
  if (!Array.isArray(p1)) {
    p1 = [p1];
  }
  if (!Array.isArray(p2)) {
    p2 = [p2];
  }
  if (p1.length == 0 && p2.length == 0) {
    return 0;
  }
  // compare lists
  // get first item.
  let t = cmp(p1[0], p2[0]);
  if (t != 0)
    return t;
  return cmp(p1.slice(1), p2.slice(1));
}
exports.cmp = cmp;
