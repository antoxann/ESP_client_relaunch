angular.module('myApp').directive('room', function() {
  return {
    restrict: 'E',
    templateUrl: 'room',
    bindToController: {
    	room: '=obj'
    },
    controller: function ($scope, JqueryProfileService, growl, RoomService, AuthService) {
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
    }
    }
});