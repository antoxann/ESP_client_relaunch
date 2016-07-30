angular.module('myApp').controller("MainController", function ($scope, AuthService) {
    console.log("MainController");
    console.log(AuthService.isLoggedIn());
    console.log(AuthService.getCurrentUser());
});
