myApp.factory('DeviceService', function(ParseService, $q) {
    var Device = Parse.Object.extend("Device");

    function createDevice (deviceModel) {
        var deferred = $q.defer();
        var query = new Parse.Query(Device);
        query.equalTo("macAddress", deviceModel.macAddress);
        query.first({
            success: function(model) {
                if (!model) {
                    deferred.reject({code:404});
                } else {
                    var device = new Device();
                    device.id = model.id;
                    device.set("owner",Parse.User.current());
                    device.set("deviceName",deviceModel.deviceName);
                    var id = deviceModel.room.id;
                    device.set("roomId",{"__type":"Pointer","className":"Room","objectId":id});
                    device.setACL(new Parse.ACL(Parse.User.current()));
                    device.save({
                        success: function(model){
                            deferred.resolve(model);
                        },
                        error: function(myObject, error) {
                            deferred.reject(error);
                        }
                    });
                }
            },
            error: function(error) {
                deferred.reject(error);
            }
        });
        return deferred.promise;
    }

    function getDevices () {
        var deferred = $q.defer();
        var devices = [];
        var query = new Parse.Query(Device);
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
        getDevices: getDevices
    }
});