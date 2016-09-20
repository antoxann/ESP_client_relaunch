angular.module('myApp').controller("RoomController",['$scope', '$stateParams', function ($scope, $stateParams) {
	console.log("RoomController");

	$scope.room = $stateParams.room;
}]);