angular.module('myApp').controller("RoomController", function ($scope) {
	console.log("RoomController");

	//object for test template
	$scope.room = {
		roomName: 'MyFirstRoom',
		tempMax: '25',
		tempMin: '21',
		area: '34'
	}
});