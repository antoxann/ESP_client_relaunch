angular.module('myApp').factory('DeviceService',['ParseService', '$q', function(ParseService, $q) {
    var Device = Parse.Object.extend("Device");

    function createDevice (deviceModel) {
      return Parse.Cloud.run('linkDeviceToUser', deviceModel);
    }

    function getDevices () {
        var deferred = $q.defer();
        var devices = [];
        var query = new Parse.Query(Device);
        query.equalTo("owner", Parse.User.current());
        query.find({
            success: function (results) {
                results.forEach(function (device, index) {
                    var tempDevice = {
                        id: device.id,
                        deviceName: device.get('deviceName'),
                        roomId: device.get('roomId'),
                        tempMin: device.get('tempMin'),
                        tempDefault: device.get('tempDefault'),
                        macAddress: device.get('macAddress')
                    };
                    devices.push(tempDevice);
                });
                deferred.resolve(devices);
            },
            error: function (error) {
                deferred.reject(error);
            }
        });
        return deferred.promise; 
    }

    function editDevice (deviceModel) {
        var deferred = $q.defer();

        var device = new Device();
        device.id = deviceModel.id;
        device.set("deviceName", deviceModel.deviceName);
        device.set("roomId",{"__type":"Pointer","className":"Room","objectId":deviceModel.room.id});

        device.save(null, {
            success: function(deviceObj){
                deferred.resolve(deviceObj);
            },
            error: function(deviceObj, error) {
                deferred.reject(error);
            }
        });

        return deferred.promise;
    }

    function getDevicesInRoom (roomId) {
        var deferred = $q.defer();
        var devices = [];

        var query = new Parse.Query(Device);
        query.equalTo("roomId",{"__type":"Pointer","className":"Room","objectId": roomId});
        query.find({
            success: function (results) {
                results.forEach(function (device, index) {
                    var tempDevice = {
                        id: device.id,
                        deviceName: device.get('deviceName'),
                        roomId: device.get('roomId'),
                        tempMin: device.get('tempMin'),
                        tempDefault: device.get('tempDefault'),
                        macAddress: device.get('macAddress')
                    }
                    devices.push(tempDevice);
                });
                deferred.resolve(devices);
            },
            error: function (error) {
                deferred.reject(error);
            }
        });
        return deferred.promise;  
    }


    return {
        createDevice: createDevice,
        getDevices: getDevices,
        editDevice: editDevice,
        getDevicesInRoom: getDevicesInRoom
    }
}]);
