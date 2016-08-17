angular.module('myApp').controller("SignupController",[ '$scope', 'AuthService', 'JqueryAuthService', function ($scope, AuthService, JqueryAuthService) {
	console.log("SignupController");
    console.log(AuthService.isLoggedIn());

    $scope.signup = function (username, email, password) {
        AuthService.signup(username, email, password);
    }
}]);

