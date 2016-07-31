angular.module('myApp').directive('device', function() {
  return {
    restrict: 'E',
    templateUrl: 'device',
    bindToController: {
    	device: '=obj'
    },
    controller: function ($scope, JqueryProfileService, growl, DeviceService, RoomService, AuthService) {
    	console.log($scope.device);

        $scope.user = AuthService.getCurrentUser();

        RoomService.getRooms().then(function (rooms) {
            $scope.rooms = rooms;
        }, function (error) {
            console.log(error);
            growl.error(error.message, {title: 'ALERT WE GOT AN ERROR'});
        })

        $scope.editDevice = function (device) {
            console.log(device);
            DeviceService.editDevice(device).then(function (model) {
                growl.success('Your device was edited successfully', {title: 'Device edited!'});
            }, function (error) {
                console.log(error);
                growl.error(error.message, {title: 'WE GOT AN ERROR'});
            });
        }
    }
  };
});