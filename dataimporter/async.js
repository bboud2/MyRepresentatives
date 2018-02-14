async function run(){
  console.log('1')
  var two = await afterTwoSeconds();
  console.log(two);
  console.log('3')
}
function afterTwoSeconds() {
    return new Promise(resolve => {
      setTimeout(() => {
      resolve('2');
    }, 2000);
  });
}
run();
