angular.module('myApp').controller("DeviceController", function ($scope, $stateParams) {
	$scope.device = $stateParams.device;
});