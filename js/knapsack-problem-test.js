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

function testSubset(verdict, things, budget) {
  var res = knapsackBruteforce(things, budget);
  var union = _.union(things, res);
  return verdict(_.difference(things, union).length === 0);
}

JSC.claim('test output is subset of input', testSubset, [JSC.array(10, JSC.object({rate: JSC.integer(20), cost: JSC.integer(10)})), JSC.integer(30)]);

function testBudget(verdict, things, budget) {
  var res = knapsackBruteforce(things, budget);
  return verdict(cost(res) <= budget);
}

JSC.claim('test cost of the solution is less then budget', testBudget, [JSC.array(10, JSC.object({rate: JSC.integer(20), cost: JSC.integer(10)})), JSC.integer(30)]);

function testGreedy(verdict, things, budget) {
  var greedy = knapsackGreedy(things, budget);
  var brute = knapsackBruteforce(things, budget);
  return verdict(greedy.equals(brute));
}

JSC.claim('test that the greedy solution return the same result of the brute force solution', 
  testGreedy, [JSC.array(10, JSC.object({rate: JSC.integer(20), cost: JSC.integer(10)})), JSC.integer(30)]);

JSC.reps(100);
$(document).ready(function() {
  JSC.check(1000);
});