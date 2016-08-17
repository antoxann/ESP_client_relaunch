angular.module('myApp').controller("DevicesController",['$scope', 'RoomService', 'DeviceService', 'growl', function ($scope, RoomService, DeviceService, growl) {
	console.log("DevicesController");

	$scope.getRooms = function () {
        RoomService.getRooms().then(function (rooms) {
            $scope.rooms = rooms;
        }, function (error) {
            console.log(error);
            growl.error(error.message, {title: 'ALERT WE GOT AN ERROR'});
        })
	}
	$scope.getRooms();

	$scope.createDevice = function (deviceModel) {
		DeviceService.createDevice(deviceModel).then(function (device) {
			console.log(deviceModel);
			$('#addDeviceModal').modal('hide');
			growl.success('Your device was added successfully', {title: 'Device added!'});
			getDevices();
		}, function (error) {
			console.log(error);
			if (error.code === 404) {
				growl.error("Device doesn't exist, please control the MacAddress", {title: 'Error!'});
			} else {
				growl.error(error.message, {title: 'WE GOT AN ERROR'});
			}
		});
	}

	function getDevices () {
		DeviceService.getDevices().then(function (devices) {
			console.log(devices);
			$scope.devices = devices;
		}, function (error) {
			console.log(error);
		})
	};
	getDevices();
	
}]);