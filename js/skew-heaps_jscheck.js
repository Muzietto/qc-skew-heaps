if (!!window.Worker) {
  var ripetizioni = 10000;
  for(var i = 0; i < 10; i += 1){
    var workerTest1 = new Worker('./js/skewHeapWorker.js');
    workerTest1.postMessage([ripetizioni, 'testing good with deletion', 'test_good_with_deletion', '[JSC.array(100, JSC.integer()), JSC.array(100, JSC.one_of([JSC.literal(insert), JSC.literal(deleteMin)]))]']);
    
    var workerTest2 = new Worker('./js/skewHeapWorker.js');
    workerTest2.postMessage([ripetizioni, 'testing invariant with deletion', 'test_invariant_with_deletion', '[JSC.array(100, JSC.integer()), JSC.array(100, JSC.one_of([JSC.literal(insert), JSC.literal(deleteMin)]))]']);
    
    var workerTest3 = new Worker('./js/skewHeapWorker.js');
    workerTest3.postMessage([ripetizioni, 'testing balanced with deletion', 'test_balanced_with_deletion', '[JSC.array(100, JSC.integer()), JSC.array(100, JSC.one_of([JSC.literal(insert), JSC.literal(deleteMin)]))]']);
    
    var workerTest4 = new Worker('./js/skewHeapWorker.js');
    workerTest4.postMessage([ripetizioni, 'testing invariant', 'test_invariant', '[JSC.array(JSC.integer(100), JSC.integer())]']);
    
    var workerTest5 = new Worker('./js/skewHeapWorker.js');
    workerTest5.postMessage([ripetizioni, 'testing balanced', 'test_balanced', '[JSC.array(JSC.integer(100), JSC.integer())]']);
    
    var workerTest6 = new Worker('./js/skewHeapWorker.js');
    workerTest6.postMessage([ripetizioni, 'test model', 'test_model', '[JSC.array(JSC.integer(100), JSC.integer())]']); 
  }
}