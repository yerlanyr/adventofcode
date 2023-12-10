import {
  comparator,
  countBy,
  identity,
  map,
  sort,
  sortBy,
  toPairs,
  zip,
} from "ramda";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

function handToCase(a) {
  const frequencies = sortBy((x) => -x[1], toPairs(countBy(identity, a)));
  switch (frequencies.length) {
    case 5:
      return 0;
    case 4:
      return 1;
    case 3: {
      if (frequencies[0][1] === 2) {
        return 3; // two pairs
      }
      if (frequencies[0][1] === 3) {
        return 4; // three of a kind
      }
      break;
    }
    case 2: {
      if (frequencies[0][1] === 3) return 5; // full house
      if (frequencies[0][1] === 4) return 6; // four of a kind
      break;
    }
    case 1: {
      return 7
    }
  }
}

function lt(a, b) {
  const labels = "23456789TJQKA";
  let caseA = handToCase(a);
  let caseB = handToCase(b);
  if (caseA !== caseB) {
    return caseA < caseB;
  }
  const mapToStrength = map((x) => labels.indexOf(x));
  const aStr = mapToStrength(a);
  const bStr = mapToStrength(b);
  for (let [aStrI, bStrI] of zip(aStr, bStr)) {
    if (aStrI === bStrI) {
      continue;
    }
    return aStrI < bStrI;
  }
}

function handToCase2(a) {
  const frequencies = sortBy((x) => -x[1], toPairs(countBy(identity, a)));
  const anothers = frequencies.filter(([, l]) => l !== 'J')
  if(!a.includes('J') || anothers.length === 0) {
    return handToCase(a)
  }
  let maxCase = handToCase(a)
  for(let another of anothers) {
    const newHand = a.replace(new RegExp('J', 'g'), another[0])
    maxCase = Math.max(handToCase(newHand), maxCase)
  }
  return maxCase
}

function lt2(a, b) {
  const labels = "J23456789TQKA";
  let caseA = handToCase2(a);
  let caseB = handToCase2(b);
  if (caseA !== caseB) {
    return caseA < caseB;
  }
  const mapToStrength = map((x) => labels.indexOf(x));
  const aStr = mapToStrength(a);
  const bStr = mapToStrength(b);
  for (let [aStrI, bStrI] of zip(aStr, bStr)) {
    if (aStrI === bStrI) {
      continue;
    }
    return aStrI < bStrI;
  }
}


function solve(input) {
  const handsBids = input.split("\n").map((x) => {
    const [hand, bid] = x.split(" ");
    const bidn = Number.parseInt(bid);
    return [hand, bidn];
  });
  const handsByStrength = sort(
    ([ha, ba], [hb, bb]) => comparator(lt)(ha, hb),
    handsBids
  );

  let k = 1;
  let res = 0;
  for (let [_, bid] of handsByStrength) {
    const win = bid * k;
    res += win;
    k += 1;
  }

  console.log("1: ", res);

  // second part
  const handsByStrength2 = sort(
    ([ha, ba], [hb, bb]) => comparator(lt2)(ha, hb),
    handsBids
  );

  k = 1;
  res = 0;
  for (let [_, bid] of handsByStrength2) {
    const win = bid * k;
    res += win;
    k += 1;
  }
  console.log('2:', res)
}



solve(
  fs
    .readFileSync(dirname(fileURLToPath(import.meta.url)) + "/test.txt")
    .toString()
);

solve(
  fs
    .readFileSync(dirname(fileURLToPath(import.meta.url)) + "/input.txt")
    .toString()
);
