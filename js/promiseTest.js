function testMonadValue(verdict){
  baseMonad()
    .then(function(data){return verdict(data === 'casa')}, function(){return verdict(false)});
}

function testPromiseValue(verdict){
    gett('http://www.unimi.it/?r_id=' + (Math.random() * 1000))
    .then(function(data){
      console.log('data is now' + JSON.stringify(data));
    });  
}

JSC.claim('test monad value', testMonadValue, []);
JSC.claim('test promise value', testPromiseValue, []);

$(document).ready(function(){
  JSC.reps(10);
  JSC.check(); 
});