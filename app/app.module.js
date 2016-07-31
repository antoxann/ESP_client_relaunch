var myApp = angular.module('myApp', ['ui.router', 'oc.lazyLoad', 'angular-growl', 'ngSanitize']);

angular.module('myApp').config(['growlProvider', function(growlProvider) {
  growlProvider.globalTimeToLive(5000);
}]);

angular.module('myApp').run(['$state', 'AuthService', '$rootScope', function($state, AuthService, $rootScope) {
  $rootScope.$on('$locationChangeSuccess', function() {
    if (!AuthService.isLoggedIn())
        $state.go('login');
  })
}]);