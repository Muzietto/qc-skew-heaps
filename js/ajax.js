
var ajax = MONAD()
  .lift('getUrl',getUrl);
  
var get = function(url){
  return function(v){
    console.log('invoking ' + url);
    return $.getJSON(url, function (data) {
        console.log('URL: ' + url + '; SUCCESS: ' + data);
        return ajax({ acc: v.acc + ' --> ' + url, data: data });
    })
    .fail(function(error){console.log('FAIL: ' + error)});
  }
}

var getUrl = function(){
  return function(v){
    var url = v.data.url;
    console.log('invoking ' + url);
    return $.getJSON(url, function(data){
      return ajax({ acc: v.acc + ' --> ' + url, data: data });
    });
  }
}

var gett = function(url){
    console.log('invoking ' + url);
    return $.getJSON(url, function (data) {
        console.log('URL: ' + url + '; SUCCESS: ' + JSON.stringify(data));
        data.filippo = 12;
        return data;
    })
    .fail(function(error){console.log('FAIL: ' + error)});
}

$(document).ready(function(){
/*
  var result0 = ajax({ acc: '', data: {}});

  var result1 = result0
    .bind(get('remote/first.json'));
*/

  var result0 = gett('remote/first.json')
                  .then(function(data){
                    console.log('data is now' + JSON.stringify(data));
                    gett(data.url)
                    .then(function(data){
                      console.log('data is now' + JSON.stringify(data));
                      gett(data.url)
                    })
                  });


/*
  var result2 = result1
    .getUrl(); // gets second.json

  var result3 = result2
    .getUrl(); // gets third.json


debugger;
  alert('gggggg');    */
  
  
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
});