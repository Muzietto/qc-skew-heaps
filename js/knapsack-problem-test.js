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

var KNAPSACK = {};
KNAPSACK.acc = [];
var index = 0;
var actualName;

function isnSet(value) {
  return (typeof value === 'undefined');
}

JSC.on_pass(function(obj) {
  if(isnSet(actualName)) {actualName = obj.name;}
  if(obj.name === actualName && index >= KNAPSACK.acc.length) {
    KNAPSACK.acc.push({
      name: obj.name,
      errorMessages: [],
      errorInputs: [],
      pass: 1,
      lost: 0,
      fail: 0
    });  
  } else if(obj.name === actualName) {
    KNAPSACK.acc[index].pass++;
  } else {
    actualName = obj.name;
    index++;
    KNAPSACK.acc.push({
      name: obj.name,
      errorMessages: [],
      errorInputs: [],
      pass: 1,
      lost: 0,
      fail: 0
    }); 
  }
});

JSC.on_fail(function(obj) {
  if(isnSet(actualName)) {actualName = obj.name;}
  if(obj.name === actualName && index >= KNAPSACK.acc.length) {
    KNAPSACK.acc.push({
      name: obj.name,
      errorMessages: [],
      errorInputs: [{serial: obj.serial, input: obj.args}],
      pass: 0,
      lost: 0,
      fail: 1
    });  
  } else if(obj.name === actualName){
    KNAPSACK.acc[index].fail++;
    KNAPSACK.acc[index].errorInputs.push({serial: obj.serial, input: obj.args});
  } else {
    actualName = obj.name;
    index++;
    KNAPSACK.acc.push({
      name: obj.name,
      errorMessages: [],
      errorInputs: [{serial: obj.serial, input: obj.args}],
      pass: 0,
      lost: 0,
      fail: 1
    }); 
  }
});

JSC.on_lost(function(obj) {
  if(isnSet(actualName)) {actualName = obj.name;}
  if(obj.name === actualName && index >= KNAPSACK.acc.length) {
    KNAPSACK.acc.push({
      name: obj.name,
      errorMessages: [{serial: obj.serial, msg: obj.exception.message}],
      errorInputs: [],
      pass: 0,
      lost: 1,
      fail: 0
    });  
  } else if(obj.name === actualName && set === true) {
    KNAPSACK.acc[index].lost++;
    KNAPSACK.acc[index].errorMessages.push({serial: obj.serial, msg: obj.exception.message});
  } else {
    actualName = obj.name;
    index++;
    KNAPSACK.acc.push({
      name: obj.name,
      errorMessages: [{serial: obj.serial, msg: obj.exception.message}],
      errorInputs: [],
      pass: 0,
      lost: 1,
      fail: 0
    }); 
  }
}); 

JSC.on_result(function(obj) {
  // paints the view as pure html
  var _render = function ($anchor, $template, data) {
    var template = $template.text() ? $template.text() : $template.html();
    $anchor.setTemplate(template);  // .text() won't work on IE!!!'
    $anchor.processTemplate(data);
  };
  _render($('#jTemplates'),$('#sampleTemplate'),KNAPSACK);
});

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