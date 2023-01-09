const fs = require('fs');

const contents = fs.readFileSync('./day6.txt').toString();

for(let i=14; i<contents.length;i++){
  if(new Set(contents.substring(i - 14, i).split('')).size === 14) {
    console.log(i);
    break;
  }
}