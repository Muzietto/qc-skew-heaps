importScripts('./lib/jscheck.js'); 
JSC.on_report(function(str) {
  console.log('\n------------------------------\n' + str + '\n------------------------------');
  });
var workerId;
var COUNTER = 0;
function XXX(verdict){
  return function(c){
    var result = false;
    var delay = Math.floor((Math.random() * 2000) + 2000);
    postMessage('WORKER ' + workerId + ': starting ' + c + ' with delay ' + delay);
    setTimeout(function(){
      result = true;
      postMessage('WORKER ' + workerId + ': awake ' + c);
    }, delay);
    
    resultsChecker();
    
    function resultsChecker() {
      setTimeout(function(){
        if (!result) {
          resultsChecker();
        } else {
          postMessage('WORKER ' + workerId + ': ending ' + c);
          verdict(true);
        }
      }, 0);
    }
  }(COUNTER++);
} 

JSC.claim('XXX', XXX, []);

onmessage = function(e) {
  workerId = e.data[1];
  var cb = e.data[2];
  eval(cb);
  pippo();
  console.log('WORKER ' + workerId + ': Message received from main script: ' + e.data );
  JSC.reps(e.data[0]);
  JSC.check();
}
