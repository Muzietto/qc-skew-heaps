function testThirdValue(verdict){
  console.log("--------------testThirdValue------------------");
  verdict(baseMonad().value().data.value === "third_value");
}

JSC.claim('test third value', testThirdValue, []);

$(document).ready(function(){
  JSC.reps(3);
  JSC.check(60*1000); 
  console.log('--> all predicates called!!');
});



