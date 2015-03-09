function testThirdValue(verdict){
  return verdict(baseMonad().value().data.value === "third_value");
}

function testNavigate(verdict, url){
  return verdict(navigate(url).value().jump <= 3);
}

JSC.group("sinc");
JSC.claim('test navigate path jump', testNavigate,
 [JSC.one_of(['remote/first.json', 'remote/second.json'])]);

JSC.group("asinc");
JSC.claim('test third value', testThirdValue, []);

$(document).ready(function(){
  JSC.reps(3);
  JSC.check(60*1000); 
  console.log('--> all predicates called!!');
});



