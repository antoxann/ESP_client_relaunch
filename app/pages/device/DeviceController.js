angular.module('myApp').controller("DeviceController", function ($scope) {
	console.log("DeviceController");

	//object for test template
	$scope.device = {
		deviceName: 'mk12-21',
		macAddress: '12:12:13:123',
		tempMin: '21',
		tempDefault: '25'
	}
});