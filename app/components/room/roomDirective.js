angular.module('myApp').directive('room', function() {
  return {
    restrict: 'E',
    templateUrl: 'room',
    bindToController: {
    	room: '=obj'
    },
    controller: function ($scope, JqueryProfileService, growl, RoomService, AuthService, DeviceService, $state) {
    	console.log($scope.room);

        $scope.user = AuthService.getCurrentUser();

        $scope.editRoom = function (roomModel) {
            RoomService.editRoom(roomModel).then(function (model) {
                growl.success('Your room was edited successfully', {title: 'Room edited!'});
            }, function (error) {
                console.log(error);
                growl.error(error.message, {title: 'WE GOT AN ERROR'});
            });
        }

        DeviceService.getDevicesInRoom($scope.room.id).then(function (res) {
            $scope.devices = res;
        }, function (error) {
            console.log(error);
        });

        $scope.deleteRoom = function () {
            RoomService.deleteRoom($scope.room.id).then(function (res) {
                $('#confirmationModal').modal('hide');
                $state.go('app.rooms');
            }, function (error) {
                console.log(error);
            });
        }
    }
    }
});