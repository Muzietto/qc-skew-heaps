JSC.on_report(function(str){console.log(str);});

function testSubset(verdict, things, budget){
  var res = knapsackBruteforce(things, budget);
  var union = _.union(things, res);
  return verdict(_.difference(things, union).length === 0);
}

JSC.claim('test output is subset of input', testSubset, [JSC.array(10, JSC.object({rate: JSC.integer(), cost: JSC.integer()})), JSC.integer()]);

function testBudget(verdict, things, budget){
  var res = knapsackBruteforce(things, budget);
  return verdict(cost(res) <= budget);
}

JSC.claim('test cost of the solution is less then budget', testBudget, [JSC.array(10, JSC.object({rate: JSC.integer(), cost: JSC.integer()})), JSC.integer()]);
JSC.reps(1000);
JSC.check(1000);