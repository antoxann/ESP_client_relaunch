angular.module('myApp').controller("LayoutController", function ($scope, AuthService, $state) {
	console.log("LayoutController");

	$scope.logout = function () {
		AuthService.logout().then(function () {
			$state.go('login');
		})
	}

});

