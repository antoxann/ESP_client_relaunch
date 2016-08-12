var myApp = angular.module('myApp', ['ui.router', 'oc.lazyLoad', 'angular-growl', 'ngSanitize']);

angular.module('myApp').config(['growlProvider', function(growlProvider) {
  growlProvider.globalTimeToLive(5000);
}]);

angular.module('myApp').run(function ($rootScope, $state, AuthService) {
  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
  	console.log('stateChangeSuccess');
    $state.previous = fromState;
  });
});