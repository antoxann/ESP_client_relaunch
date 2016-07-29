angular.module('myApp').controller("DeviceController", function ($scope, $stateParams) {
	console.log("DeviceController");

	$scope.device = $stateParams.device;
});