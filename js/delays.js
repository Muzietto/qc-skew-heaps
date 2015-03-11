var COUNTER = 0;

function XXX(verdict){
  console.log('starting ' + COUNTER++);
  var result = false;
  setTimeout(function(){
    result = true;
  },Math.floor((Math.random() * 5000) + 5000));
  
  resultsChecker();
  
  function resultsChecker() {
    setTimeout(function(){
      if (!result) {
        resultsChecker();
      } else {
        console.log('ending ' + --COUNTER);
        verdict(true);
      }
    },0);
  }
} 

JSC.claim('XXX', XXX, []);

JSC.reps(10);
JSC.check();