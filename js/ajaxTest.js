function testAjax(verdict) {
  return verdict(result3.value().jump === 3);
}

function testNavigate(verdict, url){
  return verdict(navigate(url).value().jump <= 3);
}

function testThirdValue(verdict, url){
  return verdict(result3.value().data.value === "third_value");
}

JSC.claim('test complete path jump', testAjax, []);
JSC.claim('test navigate path jump', testNavigate, [JSC.one_of(['remote/first.json', 'remote/second.json'])]);
JSC.claim('test third value', testThirdValue, [JSC.one_of(['remote/first.json', 'remote/second.json'])]);
 
JSC.reps(100);
$(document).ready(function(){
  JSC.check(1000);  
})