var ID = 1;

//function testMonadValue(verdict){
//  baseMonad(ID++)
//  .then.(
//  function(data){
//    console.log("Dentro il then dell verdict");
//    verdict(true);
//  });
//}

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


//JSC.claim('test monad value', testMonadValue, []);
JSC.claim('test promise value', testPromiseValue, [JSC.sequence([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])]);

$(document).ready(function(){
  JSC.reps(10);
  JSC.check(); 
});