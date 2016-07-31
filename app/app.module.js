var myApp = angular.module('myApp', ['ui.router', 'oc.lazyLoad', 'angular-growl', 'ngSanitize']);

angular.module('myApp').config(['growlProvider', function(growlProvider) {
  growlProvider.globalTimeToLive(5000);
}]);
