/* eslint-disable no-inner-declarations */
import { readFileSync } from "fs";
import { dirname } from "path";
import {
  count, dropWhile,
  equals, memoizeWith, sum,
  tail,
  tap
} from "ramda";
import { fileURLToPath } from "url";

const input = readFileSync(
  dirname(fileURLToPath(import.meta.url)) + "/input.txt"
).toString();
// const input = readFileSync(
//   dirname(fileURLToPath(import.meta.url)) + "/test.txt"
// ).toString();

const arr = input.split("\n").map((x) => {
  const [line, xs] = x.split(" ");
  const nums = xs.split(",").map((x) => +x);
  return [Array.from({length: 5}, () => line).join('?'), Array.from({length: 5}, () => nums).flat()];
});

function cntOrig(line, nums) {
  // ???.### 1,1,3
  if (nums.length === 0) {
    return line.includes("#") ? 0 : 1;
  }
  const numsSum = sum(nums); // 5
  const cntSignificantSymbols = count((x) => x !== ".", line); // 6
  // if nums is big and line is smaller
  if (numsSum > cntSignificantSymbols) {
    return 0;
  }
  // if nums is exactly the same as the cnt
  if (numsSum === cntSignificantSymbols) {
    // true
    // we need to chekc if groups are the same with the groups in the nums
    const groups = line
      .split(".")
      .filter((x) => x !== "")
      .map((x) => x.length);
    return equals(groups, nums) ? 1 : 0; // 1
  }
  // otherwise let's see
  // let's skip all the dots at the beginning.
  const lineSkipDots = dropWhile((x) => x === ".", line); // ???.###
  if (lineSkipDots[0] === "#") {
    // nums[0] has to be on the beginning so fill it in drop the rest
    if (lineSkipDots.substring(0, nums[0]).includes(".")) {
      return 0;
    }
    // otherwise we need to check next after nums[0]
    // if after the group we have hash it is not ok 0
    if (nums[0] < lineSkipDots.length && lineSkipDots[nums[0]] === "#") {
      return 0;
    }
    // perfect let's go forward
    return cnt(lineSkipDots.substring(nums[0] + 1), tail(nums));
  }
  // it is a question mark!
  // there are two cases possible lets return sum of two
  return cnt(tail(lineSkipDots), nums) + cnt("#" + tail(lineSkipDots), nums);
}
const cnt = memoizeWith((line, nums) => JSON.stringify([line, nums]), cntOrig)

console.log(
  sum(
    tap(
      // (x) => console.log(x),
      x => x,
      arr.map((x) => cnt(...x))
    )
  )
);
