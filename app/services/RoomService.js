angular.module('myApp').factory('RoomService', function(ParseService, $q) {
    var Room = Parse.Object.extend("Room");

    function createRoom (roomModel) {
        var deferred = $q.defer();

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
        room.set("area", roomModel.area);
        room.set("height", roomModel.height);
        room.set("windows", roomModel.windows);
        room.set("tempMin", parseFloat(roomModel.tempMin));
        room.set("tempMax", parseFloat(roomModel.tempMax));

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


    return {
        createRoom: createRoom,
        getRooms: getRooms,
        editRoom: editRoom
    }
});