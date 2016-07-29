var myApp = angular.module('myApp', ['ui.router', 'oc.lazyLoad', 'angular-growl', 'ngSanitize']);

myApp.config(['growlProvider', function(growlProvider) {
  growlProvider.globalTimeToLive(5000);
}]);