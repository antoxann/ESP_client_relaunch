angular.module('myApp').controller("RoomController", function ($scope, $stateParams) {
	console.log("RoomController");

	$scope.room = $stateParams.room;
});