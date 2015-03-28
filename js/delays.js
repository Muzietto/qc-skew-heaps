var COUNTER = 0;

function XXX(verdict){
  return function(c){
    var result = false;
    var delay = Math.floor((Math.random() * 5000) + 5000);
    console.log('starting ' + c + ' with delay ' + delay);
    setTimeout(function(){
      result = true;
      console.log('awake ' + c);
    }, delay);
    
    resultsChecker();
    
    function resultsChecker() {
      setTimeout(function(){
        if (!result) {
          resultsChecker();
        } else {
          console.log('ending ' + c);
          verdict(true);
        }
      }, 0);
    }
  }(COUNTER++);
} 

function XXX1(verdict){
  return function(c){
    var result = false;
    var delay = Math.floor((Math.random() * 5000) + 5000);
    console.log('starting ' + c + ' with delay ' + delay);
    setTimeout(function(){
      result = true;
      console.log('awake ' + c);
    }, delay);
    
    resultsChecker();
    
    function resultsChecker() {
      setTimeout(function(){
        if (!result) {
          resultsChecker();
        } else {
          console.log('ending ' + c);
          verdict(true);
        }
      }, 0);
    }
  }(COUNTER++);
} 

JSC.claim('XXX', XXX, []);
JSC.claim('XXX1', XXX1, []);

JSC.reps(10);
JSC.check();