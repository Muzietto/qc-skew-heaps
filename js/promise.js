var casa;
// ASYNC stuff
var gett = function(url){
  casa = null;
  console.log('invoking ' + url);
  return $.ajax({
    type: 'GET',
    url: url,
    contentType: 'text/plain',
    xhrFields: {
      withCredentials: false
    },
    success: function (data) {
      console.log('URL: ' + url);
      casa = 'casa';
    },
    error: function(error){console.log('FAIL: ' + JSON.stringify(error))}
  });
}  

// SYNC stuff
var getUrlFromData = function(v){
  var url = v.data.url;
  console.log('invoking ' + url);
  $.ajax({
    url: url,
    dataType: 'json',
    type: 'GET',
    cache: true,
    async: false,
    contentType: 'application/json',
    success: function (data) {
      console.log('URL: ' + url + '; SUCCESS: ' + data);
      jsonResult = data;
    },
    error: function(error){console.log('ERR: ' + error)}
  })
  return ajax({ acc: v.acc + ' --> ' + url, data: jsonResult });
}

var ajax = MONAD()
  .lift('getUrl',getUrlFromData)
  // monad.value will be a plain value
  .lift_value('value', function (s) {
      return s;
  });
  
var get = function(url){
  return function(v){
    var jsonResult = null;
    console.log('invoking ' + url);
    $.ajax({
      url: url,
      dataType: 'json',
      type: 'GET',
      cache: true,
      async: false,
      contentType: 'application/json',
      success: function (data) {
        console.log('URL: ' + url + '; SUCCESS: ' + data);
        jsonResult = data;
      },
      error: function(error){console.log('ERR: ' + error)}
    })
    return ajax({ acc: v.acc + ' --> ' + url, data: jsonResult });
  }
}

var getUrlFromChain = function(){
  return function(v){
    var url = v.data.url;
    console.log('invoking ' + url);
    $.ajax({
      url: url,
      dataType: 'json',
      type: 'GET',
      cache: true,
      async: false,
      contentType: 'application/json',
      success: function (data) {
        console.log('URL: ' + url + '; SUCCESS: ' + data);
        jsonResult = data;
      },
      error: function(error){console.log('ERR: ' + error)}
    })
    return ajax({ acc: v.acc + ' --> ' + url, data: jsonResult });
  }
}

var baseMonad = function(id){
  console.log('chiamata a base monad');
  return gett('http://fortawesome.github.io/Font-Awesome/assets/font-awesome/fonts/fontawesome-webfont.woff2?v=4.3.0&r_id=' + (Math.random() * 1000))
  .then(function(data){
    console.log('completed request');
  });
}

$(document).ready(function(){
  /*
  var result0 = ajax({ acc: 'START', data: {}});

  var result1 = result0
    .bind(get('remote/first.json'));

  var result2 = result1
    .bind(getUrlFromChain());

  var result10 = ajax({ acc: 'START', data: {}})
    .bind(get('remote/first.json'))
    .getUrl() // gets second.json
    .getUrl() // gets third.json
  ;
  alert(result10.value().acc);    
  
  // promises --> callback hell
  var resultXXX = gett('remote/first.json')
    .then(function(data){
      console.log('data is now' + JSON.stringify(data));
      gett(data.url)
      .then(function(data){
        console.log('data is now' + JSON.stringify(data));
        gett(data.url)
        .then(function(data){alert(data.value)});
      })
    });
  console.log("Fine prima");
    
  var resultXXX1 = gett('remote/first.json')
    .then(function(data){
      console.log('data is now' + JSON.stringify(data));
      gett(data.url)
      .then(function(data){
        console.log('data is now' + JSON.stringify(data));
        gett(data.url)
        .then(function(data){
          alert(data.value)   
        });
      })
    });  
  console.log("Fine seconda");

  var resultXXX2 = gett('remote/first.json')
    .then(function(data){
      console.log('data is now' + JSON.stringify(data));
      gett(data.url)
      .then(function(data){
        console.log('data is now' + JSON.stringify(data));
        gett(data.url)
        .then(function(data){
          val = data.value;
          alert(data.value);
        });
      })
    });      
  console.log("Fine terza"); 
  */
});