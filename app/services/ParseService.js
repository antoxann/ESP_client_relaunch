myApp.service('ParseService', function() {
  var app_id = "NjSUT8HxvCz706ldcwUn";
  var js_key = "";
  Parse.initialize(app_id, js_key);
  Parse.serverURL = 'http://52.29.88.163:1337/parse'
});