var TEMPLATE = {};
TEMPLATE.acc = {};

JSC.on_pass(function(obj) {
  if(!TEMPLATE.acc[obj.name]) {
    TEMPLATE.acc[obj.name] = {
      name: obj.name,
      errorMessages: [],
      errorInputs: [],
      pass: 1,
      lost: 0,
      fail: 0
    };  
  } else {
    TEMPLATE.acc[obj.name].pass++;
  }
});

JSC.on_fail(function(obj) {
  if(!TEMPLATE.acc[obj.name]) {
    TEMPLATE.acc[obj.name] = {
      name: obj.name,
      errorMessages: [],
      errorInputs: [{serial: obj.serial, input: obj.args}],
      pass: 0,
      lost: 0,
      fail: 1
    };  
  } else {
    TEMPLATE.acc[obj.name].fail++;
    TEMPLATE.acc[obj.name].errorInputs.push({serial: obj.serial, input: obj.args});
  }
});

JSC.on_lost(function(obj) {
  if(!TEMPLATE.acc[obj.name]) {
    TEMPLATE.acc[obj.name] = {
      name: obj.name,
      errorMessages: [{serial: obj.serial, msg: obj.exception.message}],
      errorInputs: [],
      pass: 0,
      lost: 1,
      fail: 0
    };  
  } else {
    TEMPLATE.acc[obj.name].lost++;
    TEMPLATE.acc[obj.name].errorMessages.push({serial: obj.serial, msg: obj.exception.message});
  }
}); 

JSC.on_result(function(obj) {
  // paints the view as pure html
  var _render = function ($anchor, $template, data) {
    var template = $template.text() ? $template.text() : $template.html();
    $anchor.setTemplate(template);  // .text() won't work on IE!!!'
    $anchor.processTemplate(data);
  };
  _render($('#jTemplates'),$('#sampleTemplate'),TEMPLATE);
});
