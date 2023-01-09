const fs = require("fs");

const contents = fs
  .readFileSync(__dirname + "/in.txt")
  .toString()
  .split("\n");

const adjTable = {};
for (var line of contents) {
  const matches = line.match(/\w+/g);
  const valve = matches[1];
  const rate = matches[5];
  const valves = matches.slice(10);
  adjTable[valve] = [+rate, valves];
}
