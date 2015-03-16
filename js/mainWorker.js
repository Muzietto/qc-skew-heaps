if (!!window.Worker) {
  for (var i = 0; i < 50; i += 1) {
    var worker = new Worker('./js/worker.js');
    worker.postMessage([10, i, "var pippo = function(){console.log('**********************************************')}"]);
    worker.onmessage = function(e){console.log('Message received from worker: ' + e.data);};
  }
}