myApp.directive('room', function() {
  return {
    restrict: 'E',
    templateUrl: 'room',
    bindToController: {
    	room: '=obj'
    },
    controller: function ($scope, JqueryService, growl, ParseService) {
    	console.log($scope.room);

        $scope.editRoom = function (roomModel) {
            var R = Parse.Object.extend("Room");
            var room=new R();
            room.id = roomModel.id;
            room.set("roomName", roomModel.roomName);
            room.set("area", roomModel.area);
            room.set("height", roomModel.height);
            room.set("windows", roomModel.windows);
            room.set("tempMin", parseFloat(roomModel.tempMin));
            room.set("tempMax", parseFloat(roomModel.tempMax));

            room.save({
                success: function(roomObj){
                    growl.success('Your room was edited successfully',{title: 'Room edited!'});
                },
                error: function(roomObj, error) {
                    console.log(error);
                    growl.error(error.message, {title: 'WE GOT AN ERROR'});
                }
            });
        }
    }
    }
});