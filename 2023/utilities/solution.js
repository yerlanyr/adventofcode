import { getFileContents } from "./getFileContents.js";

export function solution(inputFilePath, testFilePath, parser, firstPart, secondPart) {
  const input = parser(getFileContents(inputFilePath));
  const testInput = parser(getFileContents(testFilePath));
  console.log("Test input");
  console.log("  First part");
  console.log(firstPart(testInput));
  console.log("  Second part");
  console.log(secondPart(testInput));
  console.log("\n\nActual input");
  console.log("  First part");
  console.log(firstPart(input));
  console.log("  Second part");
  console.log(secondPart(input));
}
