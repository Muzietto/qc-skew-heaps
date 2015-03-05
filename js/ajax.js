// ASYNC stuff
var gett = function(url){
  console.log('invoking ' + url);
  return $.getJSON(url, function (data) {
      console.log('URL: ' + url + '; SUCCESS: ' + JSON.stringify(data));
      data.filippo = 12;
      return data;
  })
  .fail(function(error){console.log('FAIL: ' + error)});
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
  return { acc: v.acc + ' --> ' + url, data: jsonResult, jump: v.jump + 1 };
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
    return ajax({ acc: v.acc + ' --> ' + url, data: jsonResult, jump: v.jump + 1 });
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
    return ajax({ acc: v.acc + ' --> ' + url, data: jsonResult, jump: v.jump + 1 });
  }
}

var navigate = function(url){
  var result = ajax({ acc: 'START', data: {}, jump: 0}).bind(get(url));
  while('url' in Object.keys(result)){
    result = result.getUrl();  
  }
  console.log('NAVIGATE');
  return result;
}

var result3;

function pausecomp(millis)
 {
  var date = new Date();
  var curDate = null;
  do { curDate = new Date(); }
  while(curDate-date < millis);
}

function base(url){
  var result0 = ajax({ acc: 'START', data: {}, jump: 0});

  var result1 = result0
    .bind(get(url));
  pausecomp(5000)
  var result2 = result1
    .bind(getUrlFromChain());
    
  result3 = result2.getUrl();
  /*
  var result10 = ajax({ acc: 'START', data: {}, jump: 0})
    .bind(get('remote/first.json'))
    .getUrl() // gets second.json
    .getUrl(); // gets third.json
  */
}

/*
$(document).ready(function(){

  var result0 = ajax({ acc: 'START', data: {}, jump: 0});

  var result1 = result0
    .bind(get('remote/first.json'));
  pausecomp(5000)
  var result2 = result1
    .bind(getUrlFromChain());
    
  result3 = result2.getUrl();

  var result10 = ajax({ acc: 'START', data: {}, jump: 0})
    .bind(get('remote/first.json'))
    .getUrl() // gets second.json
    .getUrl(); // gets third.json

  //alert(result10.value().acc);     
  
  // promises --> callback hell
  /*
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
  
});*/

/*
$.ajax({
      url: 'remote/first.json',
      dataType: 'json',
      type: 'GET',
      cache: true,
      //async: false,
      contentType: 'application/json',
      success: function (data, textStatus) {
        console.log("RECV: " + data);
        debugger;
        return ajax({ acc: v.acc + ' --> ' + url, data: data });
      },
      error: function(error){console.log('ERR: ' + error)}
    })
*/

