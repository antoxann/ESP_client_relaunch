angular.module('myApp').controller("RoomsController", function ($scope) {
	console.log("RoomsController");
	//ToDo Angular implementation
	$scope.createRoom = function (room) {
		$('#addRoomModal').modal('hide');
	}
});