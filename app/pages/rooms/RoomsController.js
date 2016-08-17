angular.module('myApp').controller("RoomsController",['$scope', 'growl', 'RoomService',  function ($scope, growl, RoomService) {
	console.log("RoomsController");
	var Room = Parse.Object.extend("Room");
	$scope.rooms = [];

	$scope.getRooms = function () {
        RoomService.getRooms().then(function (rooms) {
            $scope.rooms = rooms;
            console.log($scope.rooms);
        }, function (error) {
            console.log(error);
            growl.error(error.message, {title: 'ALERT WE GOT AN ERROR'});
        })
	}
	$scope.getRooms();

	$scope.createRoom = function (roomModel) {
        RoomService.createRoom(roomModel).then(function (createdRoom) {
            $('#addRoomModal').modal('hide');
            growl.success('Your room was added successfully',{title: 'Room added!'});
            $scope.getRooms();
        }, function (error) {
            console.log(error);
            growl.error(error.message, {title: 'WE GOT AN ERROR'});
        })
	}
}]);