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
  pauseComp(1000);
  return { acc: v.acc + ' --> ' + url, data: jsonResult, jump: v.jump + 1 };
}
  
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
    pauseComp(1000);
    return ajax({ acc: v.acc + ' --> ' + url, data: jsonResult, jump: v.jump + 1 });
  }
}

var navigate = function(url) {
  var result = ajax({ acc: 'START', data: {}, jump: 0}).bind(get(url));
  while('url' in Object.keys(result)){
    result = result.getUrl();
  }
  return result;
}

function baseMonad(){
  return ajax({ acc: 'START', data: {}, jump: 0})
    .bind(get('remote/first.json'))
    .getUrl() // gets second.json
    .getUrl(); // gets third.json
}

var ajax = MONAD()
  .lift('getUrl',getUrlFromData)
  // monad.value will be a plain value
  .lift_value('value', function (s) {
      return s;
  });

function pauseComp(millis) {
  var date = new Date(), curDate;
  do { 
    curDate = new Date(); 
  } while(curDate-date < millis);
}