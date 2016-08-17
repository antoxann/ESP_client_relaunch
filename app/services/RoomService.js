angular.module('myApp').factory('RoomService', ['ParseService', '$q', function(ParseService, $q) {
    var Room = Parse.Object.extend("Room");

    function createRoom (roomModel) {
        var deferred = $q.defer();

        var room = new Room({
            roomName: roomModel.roomName,
            area: roomModel.area,
            height: roomModel.height,
            windows: roomModel.windows,
            tempMin: parseFloat(roomModel.tempMin),
            tempMax: parseFloat(roomModel.tempMax)
        });
        room.setACL(new Parse.ACL(Parse.User.current()));
        room.save(null, {
            success: function(model) {
                deferred.resolve(model);
            },
            error: function(model, error) {
                deferred.reject(error);
            }
        });
        return deferred.promise;
    }

    function getRooms () {
        var deferred = $q.defer();
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
                deferred.resolve(rooms);
            },
            error: function (error) {
                deferred.reject(error);
            }
        });
        return deferred.promise; 
    }

    function editRoom (roomModel) {
        var deferred = $q.defer();
        var room = new Room();
        room.id = roomModel.id;
        room.set("roomName", roomModel.roomName);

        room.save({
            success: function(roomObj){
                deferred.resolve(roomObj);
            },
            error: function(roomObj, error) {
                deferred.reject(error);
            }
        });

        return deferred.promise;
    }

    function deleteRoom (roomId) {
        var deferred = $q.defer();
        var room = new Room();
        room.id= roomId;

        room.destroy({
            success: function(myObject) {
                deferred.resolve(myObject);
            },
            error: function(myObject, error) {
                deferred.reject(error);
            }
        });
        return deferred.promise;
    }


    return {
        createRoom: createRoom,
        getRooms: getRooms,
        editRoom: editRoom, 
        deleteRoom: deleteRoom
    }
}]);