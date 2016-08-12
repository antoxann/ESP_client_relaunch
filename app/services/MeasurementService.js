angular.module('myApp').factory('MeasurementService', function(ParseService, DeviceService, $q) {
    var measurement = Parse.Object.extend("Measurement");
    var devices;
    DeviceService.getDevices().then(function (devs) {
        devices = devs;
    }, function (error) {
        console.log(error);
    })

    

    function getLatestMeasurement (limit) {
        var deferred = $q.defer();
        var results = [];
        var query = new Parse.Query(measurement);
        query.descending("updatedAt");
        query.limit(limit);
        query.find().then(function (objects)  {
                var time, name, macAddress
                for (var i = 0, x = objects.length; i <  x; i++) {
                    time = moment(objects[i].updatedAt).fromNow();
                    macAddress = objects[i].get('macAddress');
                    name = objects[i].get('deviceId').get('deviceName');
                    results.push({
                        objid: objects[i].id,
                        mac: macAddress,
                        time: time,
                        name: name
                    });
                    deferred.resolve(results);
                }
            })
        return deferred.promise;
    }

    return {
        getLatestMeasurement: getLatestMeasurement
    }
});