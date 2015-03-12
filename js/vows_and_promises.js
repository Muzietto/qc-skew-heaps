// the deferred
var vow = VOW.make();

// promise may even remain unreferenced
vow.promise.when(urrah,sorry);

setTimeout(keepOrBreak(vow),0);

// resolve or fail
function keepOrBreak(vow,counter){
  return function(){
    setTimeout(function(){
      var value = Math.random();
      // mixing numbers with strings
      var msg = value + ((counter) ? ' - ' + counter : '');
      // using side effects (very dirty trick!)
      (value > 0.5) ? vow.keep(msg) : vow.break(msg);
    },1000);
  }
}

// onSuccess - NB: value may be an array!
function urrah(value) {
  alert('URRAH!! - ' + JSON.stringify(value));
}

// onFail - NB: value may be an array!
function sorry(value) {
  value = value || 'no value returned';
  alert('sorry... - ' + JSON.stringify(value));
}

// use VOW.every
var promise1 = (function(counter){
  var vow = VOW.make();
  setTimeout(keepOrBreak(vow,counter),0);
  return vow.promise;
}(1))

var promise2 = makePromise(2);
var everyPromise = VOW.every([promise1,promise2]);

everyPromise.when(urrah,sorry);

// use VOW.first
VOW.first([makePromise(1),makePromise(2)]).when(urrah,sorry);

// use VOW.any
VOW.any([makePromise(1),makePromise(2),makePromise(3)]).when(urrah,sorry);

function makePromise(counter){
  var vow = VOW.make();
  setTimeout(keepOrBreak(vow,counter),0);
  return vow.promise;  
}

console.log('script completed');
