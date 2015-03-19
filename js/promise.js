var gett = function(url){
  //console.log('invoking ' + url);
  return $.ajax({
    type: 'GET',
    url: url,
    contentType: 'text/plain',
    xhrFields: {
      withCredentials: false
    },
    success: function (data) {
      //console.log('URL: ' + url);
    },
    error: function(error){console.log('FAIL: ' + JSON.stringify(error))}
  });
}  

/*
var baseMonad = function(id){
  console.log('ID: ' + id + ' JUMP: 1');
  return gett('remote/first.json')
  .then(function(data){
    console.log('ID: ' + id + ' JUMP: 2');
    gett(data.url)
    .then(function(data){
      console.log('ID: ' + id + ' JUMP: 3');
      gett(data.url)
      .then(function(data){
        console.log('End of ID: ' + id);
      });
    });
  });
}
*/