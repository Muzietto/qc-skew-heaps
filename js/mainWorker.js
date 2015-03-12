if (!!window.Worker) {
  var myFirstWorker = new Worker("js/firstWorker.js");
  myFirstWorker.postMessage(10);
  myFirstWorker.onmessage = function(e) {
    console.log('Message received from FIRST worker: ' + e.data);
  }
  var mySecondWorker = new Worker("js/secondWorker.js");
  mySecondWorker.postMessage(10);
  mySecondWorker.onmessage = function(e) {
    console.log('Message received from SECOND worker: ' + e.data);
  }
}