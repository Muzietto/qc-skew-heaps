if (!!window.Worker) {
	var myWorker = new Worker("js/worker.js");
  myWorker.postMessage(10);
	myWorker.onmessage = function(e) {
    console.log('Message received from worker: ' + e.data);
	}
}