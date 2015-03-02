var KNAPSACK = {};
KNAPSACK.acc = [];

var set = false;
var index = 0;
var actualName;

//JSC.on_report(function(str){console.log(str);});
JSC.on_pass(function(obj) {
  if(typeof actualName === 'undefined') {actualName = obj.name;}
  if(obj.name === actualName && set === true){
    KNAPSACK.acc[index].pass++;
  } else if(obj.name === actualName && set === false){
    KNAPSACK.acc.push({
      name: obj.name,
      errorMessages: [],
      errorInputs: [],
      pass: 1,
      lost: 0,
      fail: 0
    });  
    set = true;
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
    set = true;
  }
});

JSC.on_fail(function(obj) {
  if(typeof actualName === 'undefined') {actualName = obj.name;}
  if(obj.name === actualName && set === true){
    KNAPSACK.acc[index].fail++;
    KNAPSACK.acc[index].errorInputs.push({serial: obj.serial, input: obj.args});
  } else if(obj.name === actualName && set === false){
    KNAPSACK.acc.push({
      name: obj.name,
      errorMessages: [],
      errorInputs: [{serial: obj.serial, input: obj.args}],
      pass: 0,
      lost: 0,
      fail: 1
    });  
    set = true;
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
    set = true;
  }
});

JSC.on_lost(function(obj) {
  if(typeof actualName === 'undefined') {actualName = obj.name;}
  if(obj.name === actualName && set === true){
    KNAPSACK.acc[index].lost++;
    KNAPSACK.acc[index].errorMessage.push({serial: obj.serial, msg: obj.exception.message});
  } else if(obj.name === actualName && set === false){
    KNAPSACK.acc.push({
      name: obj.name,
      errorMessages: [{serial: obj.serial, msg: obj.exception.message}],
      errorInputs: [],
      pass: 0,
      lost: 1,
      fail: 0
    });  
    set = true;
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
    set = true;
  }
}); 

JSC.on_result(function(obj) {
  debugger;
  // paints the view as pure html
  var _render = function ($anchor, $template, data) {
    var template = $template.text() ? $template.text() : $template.html();
    $anchor.setTemplate(template);  // .text() won't work on IE!!!'
    $anchor.processTemplate(data);
  };
  _render($('#jTemplates'),$('#sampleTemplate'),KNAPSACK);
});

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

JSC.reps(100);
$(document).ready(function(){
JSC.check(1000);
});