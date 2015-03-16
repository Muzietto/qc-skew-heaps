importScripts('./lib/jscheck.js'); 
JSC.on_report(function(str) {console.log(str)});

var COUNTER = 0;
function XXX(verdict){
  return function(c){
    var result = false;
    var delay = Math.floor((Math.random() * 5000) + 5000);
    postMessage('starting ' + c + ' with delay ' + delay);
    setTimeout(function(){
      result = true;
      postMessage('awake ' + c);
    }, delay);
    
    resultsChecker();
    
    function resultsChecker() {
      setTimeout(function(){
        if (!result) {
          resultsChecker();
        } else {
          postMessage('ending ' + c);
          verdict(true);
        }
      }, 0);
    }
  }(COUNTER++);
} 

JSC.claim('XXX', XXX, []);

onmessage = function(e) {
  console.log('Message received from main script: ' + e.data );
  JSC.reps(e.data);
  JSC.check();
}

