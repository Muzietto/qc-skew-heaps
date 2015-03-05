function testAjax(verdict) {
  return verdict(result3.value().jump === 3);
}

function testThirdValue(verdict, url){
  return verdict(result3.value().data.value === "third_value");
}

function testNavigate(verdict, url){
  return verdict(navigate(url).value().jump <= 3);
}

JSC.group("sinc");
JSC.claim('test navigate path jump', testNavigate, [JSC.one_of(['remote/first.json', 'remote/second.json'])]);

JSC.group("asinc");
JSC.claim('test complete path jump', testAjax, []);
JSC.claim('test third value', testThirdValue, [JSC.one_of(['remote/first.json', 'remote/second.json'])]);

function ex1(callback) {
  JSC.check("sinc", 1000);
  callback();
}

function ex2(callback) {
  base('remote/first.json');
  JSC.check("asinc", 1000);
  callback();
}

$(document).ready(function(){
  //JSC.check(1000);  
  async.series([
    function(callback) {
      ex1(callback);
    },
    function(callback) {
      ex2(callback);
    }
  ]);
});



