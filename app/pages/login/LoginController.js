angular.module('myApp').controller("LoginController", function ($scope, AuthService, JqueryAuthService) {
	console.log("LoginController");
    console.log(AuthService.isLoggedIn());

    $scope.signin = function (username, password) {
        AuthService.signin(username, password);
    }    
});

