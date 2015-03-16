importScripts('./lib/jscheck.js', './lib/underscore-min.js','./skew-heaps.js'); 

JSC.on_report(function(str) {
  console.log('\n------------------------------\n' + str + '\n------------------------------');
});
  
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}  

var claimMethods = {};

claimMethods.test_invariant = function test_invariant(verdict, arr){
	return verdict(invariant(make(arr)));
}

claimMethods.test_balanced = function test_balanced(verdict, arr){
	return verdict(balanced(make(arr)));
}

claimMethods.test_invariant_with_deletion = function test_invariant_with_deletion(verdict, elements, ops){
	return verdict(invariant(makeWhitPattern(elements, ops)));
}

claimMethods.test_balanced_with_deletion = function test_balanced_with_deletion(verdict, elements, ops){
	return verdict(balanced(makeWhitPattern(elements, ops)));
}

claimMethods.test_good_with_deletion = function test_good_with_deletion(verdict, elements, ops){
	return verdict(good(makeWhitPattern(elements, ops)));
}

claimMethods.test_model = function test_model(verdict, arr){
    var res = make(arr);
    return verdict(model(res).equals(model(res)));
}
  
onmessage = function(e) {
  var claimName = e.data[1];
  var claimMethod = e.data[2];
  var claimParameters = eval(e.data[3]);
  JSC.claim(claimName, claimMethods[claimMethod], claimParameters);
  console.log('WORKER FOR CLAIM: ' + claimName + '--> Message received from main script = [' + e.data + ']');
  JSC.reps(e.data[0]);
  JSC.check();
}