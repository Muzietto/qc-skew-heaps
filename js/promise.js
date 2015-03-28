var gett = function(url){
  return $.ajax({
    type: 'GET',
    url: url,
    contentType: 'text/plain',
    xhrFields: {
      withCredentials: false
    },
    success: function (data) {
    },
    error: function(error){console.log('FAIL: ' + JSON.stringify(error))}
  });
}  

var baseMonad = function(id){
  console.log('ID: ' + id + ' JUMP: 1');
  return gett('remote/first.json')
  .then(function(data){
    console.log('ID: ' + id + ' JUMP: 2');
    return gett(data.url)
    .then(function(data){
      console.log('ID: ' + id + ' JUMP: 3');
      return gett(data.url)
      .then(function(data){
        console.log('End of ID: ' + id);
      });
    });
  });
}
