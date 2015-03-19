function testMonadValue(verdict, id){
  baseMonad(id)
  .then(
  function(data){
    console.log("Dentro il then dell verdict ID: " + id);
    verdict(true);
  });
}

function testPromiseValue(verdict, id){
  console.log('ID: ' + id + ' JUMP: 1');
  return gett('remote/first.json')
  .then(function(data){
    console.log('ID: ' + id + ' JUMP: 2');
    gett(data.url)
    .then(function(data){
      console.log('ID: ' + id + ' JUMP: 3');
      gett(data.url)
      .then(function(data){
        console.log('End Of ID: ' + id);
        verdict(true);
      });
    });
  });
}


JSC.claim('test monad value', testMonadValue, [JSC.sequence([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])]);
JSC.claim('test promise value', testPromiseValue, [JSC.sequence([11, 12, 13, 14, 15, 16, 17, 18, 19, 20])]);

$(document).ready(function(){
  JSC.reps(10);
  JSC.check(); 
});