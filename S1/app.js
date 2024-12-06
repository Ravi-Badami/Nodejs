const fs = require('fs');

setImmediate(() => {
  process.nextTick(() => console.log('nextTick 2'));
  console.log('setImemediate');
});

setTimeout(() => {
  console.log('Timer expired');
}, 0);

Promise.resolve(() => console.log('Promise'));

fs.readFile('./file.txt', 'utf-8', () => {
  setTimeout(() => {
    console.log('2nd Timerr');
  }, 0);
  process.nextTick(() => console.log('2nd nextTick'));
  setImmediate(() => {
    process.nextTick(() => console.log('nextTick 34'));
    console.log('2nd setImmediate');
  });
  console.log('File reading CB');
});

process.nextTick(() => console.log('nextTick'));
console.log('Last line of the file');
