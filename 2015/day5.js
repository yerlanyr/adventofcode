import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

function solve(input) {
  console.log(input.split("\n").filter((line) => isNice(line)).length);

  function isNice(line) {
    const req1 = line.split("").filter((x) => "aeiou".includes(x)).length >= 3;
    const req2 = line.split("").some((x, i, arr) => i > 0 && x === arr[i - 1]);
    const req3 = ["ab", "cd", "pq", "xy"].every((str) => !line.includes(str));
    return req1 && req2 && req3;
  }

  console.log(input.split("\n").filter((line) => isNice2(line)).length);
  function isNice2(line) {
    const req1 = line.split('').some((x, i, arr) => {
      const newLocal_1 = line.substring(i + 1, line.length);
      const newLocal_2 = line.substring(i - 1, i + 1);
      const newLocal = newLocal_1.includes(newLocal_2);
      return newLocal_2.length === 2 && newLocal
    })
    const req2 = line.split('').some((x, i, arr) => i - 2 >= 0 && arr[i-2] === x)
    return req1 && req2
  }
}

solve(fs.readFileSync(dirname(fileURLToPath(import.meta.url)) + "/day5sample.txt").toString());
solve(fs.readFileSync(dirname(fileURLToPath(import.meta.url)) + "/day5.txt").toString());
