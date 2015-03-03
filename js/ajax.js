
var gett = function(url){
    console.log('invoking ' + url);
    return $.getJSON(url, function (data) {
        console.log('URL: ' + url + '; SUCCESS: ' + JSON.stringify(data));
        data.filippo = 12;
        return data;
    })
    .fail(function(error){console.log('FAIL: ' + error)});
}

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

$(document).ready(function(){

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
  
//debugger;
  alert(result10.value().acc);    
  
  
/*
$.ajax({
      url: 'remote/first.json',
      dataType: 'json',
      type: 'GET',
      cache: true,
      contentType: 'application/json',
      success: function (data, textStatus) {
        console.log("RECV: " + data);
        debugger;
        return ajax({ acc: v.acc + ' --> ' + url, data: data });
      },
      error: function(error){console.log('ERR: ' + error)}
    })
*/


/* this bugger works
  var resultXXX = gett('remote/first.json')
                  .then(function(data){
                    console.log('data is now' + JSON.stringify(data));
                    gett(data.url)
                    .then(function(data){
                      console.log('data is now' + JSON.stringify(data));
                      gett(data.url)
                    })
                  });


*/
});