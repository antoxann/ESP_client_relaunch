angular.module('myApp').controller("SignupController", function ($scope, AuthService, JqueryService) {
	console.log("SignupController");
    console.log(AuthService.isLoggedIn());

    $scope.signup = function (username, email, password) {
        AuthService.signup(username, email, password);
    }
});

