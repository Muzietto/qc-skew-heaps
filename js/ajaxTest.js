var ID = 0;

function testThirdValue(verdict){
  setTimeout(function() {
    verdict(baseMonad(ID++).value().data.value === "third_value");
  }, 0);
  console.log("esco");
}

JSC.claim('test third value', testThirdValue, []);

$(document).ready(function(){
  JSC.reps(3);
  JSC.check(); 
  console.log('--> all predicates called!!');
});



