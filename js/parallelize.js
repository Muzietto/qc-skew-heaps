var runs = 10;
var results = [];

for (var cc = 0; cc < runs; cc++) {
  (function(lc){
    console.log('launching ' + lc);
    setTimeout(function(){
      results[lc] = lc;
    },Math.floor((Math.random() * 1500) + 500));
  }(cc))
}

function resultsChecker(cb) {
  setTimeout(function(){
    if (results.length < runs-1) {
      console.log('not enough results')
      resultsChecker(cb);
    } else {
      cb('URRAH!!!');
    }
  },0);
}

resultsChecker(function(msg){console.log(msg)});
