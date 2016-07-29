angular.module('myApp').controller("LoginController", function ($scope, AuthService, JqueryService) {
	console.log("LoginController");
    console.log(AuthService.isLoggedIn());

    $scope.signin = function (username, password) {
        AuthService.signin(username, password);
    }    
});

