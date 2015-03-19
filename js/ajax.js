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
  console.log('Ajax of test ID: ' + v.id + ', jump number: ' + v.jump);
  return { acc: v.acc + ' --> ' + url, data: jsonResult, jump: (v.jump + 1), id: v.id};
}
  
var get = function(url, id, jump){
  return function(v){
    v.id = id;
    v.jump = jump;
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
      console.log('Ajax of test ID: ' + v.id + ', jump number: ' + v.jump);
    return ajax({ acc: v.acc + ' --> ' + url, data: jsonResult, jump: (v.jump + 1), id: v.id});
  }
}

var navigate = function(url, id) {
  var result = ajax({ acc: 'START', data: {}, jump: 0}).bind(get(url));
  while('url' in Object.keys(result)){
    result = result.getUrl();
  }
  return result;
}

function baseMonad(id){
  return ajax({ acc: 'START', data: {}})
    .bind(get('remote/first.json', id, 1))
    .getUrl() // gets second.jsons
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