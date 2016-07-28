angular.module('myApp').controller("RoomsController", function ($scope, growl, ParseService) {
	console.log("RoomsController");
	var Room = Parse.Object.extend("Room");
	$scope.rooms = [];

	$scope.getRooms = function () {
		var rooms = [];
        var query = new Parse.Query(Room);
        query.find({
        	success: function (results) {
        		results.forEach(function (room, index) {
        			var tempRoom = {
        				id: room.id,
        				roomName: room.get('roomName'),
        				tempMin: room.get('tempMin'),
        				tempMax: room.get('tempMax'),
        				area: room.get('area'),
        				height: room.get('height'),
        				windows: room.get('windows')
        			}
        			rooms.push(tempRoom);
        		});
        		$scope.rooms = rooms;
        		console.log($scope.rooms);
        		$scope.$apply();
        	},
        	error: function (error) {
        		growl.error(error.message, {title: 'ALERT WE GOT AN ERROR'});
        	}
        });
	}
	$scope.getRooms();

	$scope.createRoom = function (roomModel) {
        var room = new Room();
        room.set("roomName", roomModel.roomName);
        room.set("area", roomModel.area);
        room.set("height", roomModel.height);
        room.set("windows", roomModel.windows);
        room.set("tempMin", parseFloat(roomModel.tempMin));
        room.set("tempMax", parseFloat(roomModel.tempMax));
        room.setACL(new Parse.ACL(Parse.User.current()));
        room.save(null, {
            success: function(model) {
                $('#addRoomModal').modal('hide');
                growl.success('Your room was added successfully',{title: 'Room added!'});
                $scope.getRooms();
            },
            error: function(model, error) {
            	console.log(error);
            	growl.error(error.message, {title: 'WE GOT AN ERROR'});
            }
        });
	}
});