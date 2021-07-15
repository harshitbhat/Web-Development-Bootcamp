console.log('Hello from args file');
//console.log(process.argv);
const names = process.argv.slice(2);
for(const name of names) {
    console.log('Hello ', name);
}