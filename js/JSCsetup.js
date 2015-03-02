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
