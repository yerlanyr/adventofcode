import fs from "fs";

export function getFileContents(path) {
  return fs.readFileSync(path).toString();
}
