angular.module('myApp').controller("LayoutController",[ '$scope', 'AuthService', '$state', function ($scope, AuthService, $state) {

	$scope.logout = function () {
		AuthService.logout().then(function () {
			$state.go('login');
		})
	}
	
}]);

