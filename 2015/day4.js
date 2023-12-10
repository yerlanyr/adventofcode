import fn from 'md5'

for(let i=0;;i++) {
  if(fn('bgvyzdsv' + i).startsWith('000000')) {
    console.log(i)
    break;
  }
}