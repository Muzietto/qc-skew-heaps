if (!!window.Worker) {
  for (var i = 0; i < 10; i += 1) {
    var worker = new Worker('./js/worker.js');
    worker.postMessage(10);
    worker.onmessage = function(e){console.log('Message received from FIRST worker: ' + e.data);};
  }
}