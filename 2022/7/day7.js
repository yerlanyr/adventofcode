const fs = require('fs');

const contents = fs.readFileSync('./day7.txt').toString();

let rootContext = {
  parent: false,
  dirs: {},
  dirsIds: [],
  files: {},
  filesIds: []
};
const commands = contents.split('$').map(command => command.split('\n')).map(tokens => ({
  command: tokens[0].trim(),
  output: tokens.slice(1)
})).filter(item => item.command)

let currentContext = rootContext

for(let {command, output} of commands) {
  if(command.startsWith('cd')) {
    if(command.endsWith('..')) {
      if(currentContext.parent) {
        currentContext = currentContext.parent
      }
    } else if(command == 'cd /') {
      currentContext = rootContext
    } else {
      const directoryName = command.split(' ')[1]
      currentContext = currentContext.dirs[directoryName]
    }
  } else if(command.startsWith('ls')) {
    for(let line of output) {
      if(line === '') {
        continue;
      }
      const tokens = line.split(' ')
      if(line.startsWith('dir') && !currentContext.dirs[tokens[1]]) {
        currentContext.dirs[tokens[1]] = {
          parent: currentContext,
          dirs: {},
          dirsIds: [],
          files: {},
          filesIds: []
        }
        currentContext.dirsIds.push(tokens[1])
      } else {
        currentContext.files[tokens[1]] = parseInt(tokens[0])
        currentContext.filesIds.push(tokens[1])
      }
    }
  }
}
let res = 0;
// traverse to find to total sum and wit the ones directories that ltq  100_000 and the sum of these directories
function dfs(ctx, currSize) {
  // eval total
  let total = 0;
  for(let fid of ctx.filesIds) {
    if(Number.isNaN(ctx.files[fid])) {
      continue;
    }
    total += ctx.files[fid]
  }

  for(let did of ctx.dirsIds) {
    total += dfs(ctx.dirs[did], currSize + total)
  }

  if(total <= 100000) {
    res += total;
  }
  return total
}

dfs(rootContext, 0)
console.log(res);