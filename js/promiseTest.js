function testMonadValue(verdict){
  baseMonad()
    .then(function(data){verdict(casa === 'casa')});
}

function testPromiseValue(verdict){
  console.log('chiamata a test promise value');
  gett('http://fortawesome.github.io/Font-Awesome/assets/font-awesome/fonts/fontawesome-webfont.woff2?v=4.3.0&r_id=' + (Math.random() * 1000))
  .then(function(data){
    console.log('completed test request');
    verdict(true);
  });  
}

JSC.claim('test monad value', testMonadValue, []);
JSC.claim('test promise value', testPromiseValue, []);

$(document).ready(function(){
  JSC.reps(10);
  JSC.check(); 
});