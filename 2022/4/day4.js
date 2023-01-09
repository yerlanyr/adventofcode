const fs = require('fs');

const contents = fs.readFileSync('./day4.txt').toString();
// const contents = fs.readFileSync('./day4sample.txt').toString();

const pairsAndRanges = contents.split('\n').map(line => line.split(',').map(range => range.split('-').map(number => parseInt(number))))

function rangeIncludes(range, [c,d]) {
  return inRange(c, range) && inRange(d, range);

  function inRange(value, [l, r]) {
    return l <= value && value <= r;
  }
}

function rangeOverlaps(range, [c,d]) {
  return inRange(c, range) || inRange(d, range);

  function inRange(value, [l, r]) {
    return l <= value && value <= r;
  }
}

let count = 0;
for(let [rangeA, rangeB] of pairsAndRanges) {
  if(rangeOverlaps(rangeA, rangeB) || rangeOverlaps(rangeB, rangeA)) {
    count++;
  }
}
console.log(count)