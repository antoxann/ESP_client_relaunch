angular.module('myApp').controller("ChartsController", function ($scope, $filter, JqueryProfileService) {
	console.log("ChartsController");

    var toInit = new Date();
    var fromInit = new Date();
    toInit.setHours(23,59,59,59);
    fromInit.setHours(0,0,0,0);

    genChart(0, toInit, fromInit, 0);

    //for update chart with new dates
    $scope.updateChart = function () {
    	var to = new Date($scope.newTo);
    	var from  = new Date($scope.newFrom);
    	to = new Date(to.setHours(23,59,59,59));
    	from = new Date(from.setHours(0,0,0,0));
    	genChart(0, to, from, 0);
    }

    //for today button on the view
    $scope.today = function () {
    	genChart(0, toInit, fromInit, 0);
    }

    //ToDo implement on backend?
	function genChart(limit, to, from, roomId) {
        console.log("from:"+from+" to:"+to);

        //update variables
        $scope.toInit = $filter('date')(to, 'medium');
    	$scope.fromInit = $filter('date')(from, 'medium');

        var measure = Parse.Object.extend("Measurement");
        var query = new Parse.Query(measure);

        if (roomId != 0) {
            query.equalTo("roomId",{"__type":"Pointer","className":"Rooms","objectId":roomId});
        }

        query.lessThanOrEqualTo("createdAt", to);
        query.greaterThanOrEqualTo("createdAt", from);
        // query.limit(limit);
        query.exists("macAddress");

        query.find({
            success: function (objects) {
            	console.log(objects);
                var tempRes = [];
                var temp, date, pres, hum;
                var temps = [];
                var hums = [];
                //collect data array for chart
                for (var i = 0, x = objects.length; i < x; i++) {
                    date = objects[i].createdAt;
                    temps[i] = $filter('number')(objects[i].get('temp'), 1);
                    hums[i] = objects[i].get('hum')/100;
                    pres = $filter('number')(objects[i].get('presence'), 0)*0.1;

                    tempRes.push({
                        id: objects[i].id,
                        macAddress: objects[i].get('macAddress'),
                        temp: temps[i],
                        hum: hums[i],
                        presence: pres,
                        time: date
                    });
                }

                chart = c3.generate({
                    data: {
                        json: tempRes,
                        keys: {
                            x: 'time',
                            value: [ 'temp','presence','hum'],
                        },

                        axes: {
                            temp: 'y',
                            presence: 'y2',
                            hum:'y2',
                        },
                        types: {
                            hum: 'step',
                            temp: 'area-step',
                            presence:'bar',
                        },
                        colors: {
                            temp: '#ec971f',
                            hum: '#5bc0de',
                    }

                    },
                    axis: {
                        x: {
                            type: 'timeseries',
                            tick: {
                                format: '%H:%M',
                            },
                        },
                        y: {
                            tick: {
                                format: d3.format(".2n"),
                            },
                            min: 15,
                        },

                        y2: {
                            show: true,
                            tick: {
                                format: d3.format("%")
                            },
                            max: 0.9,

                        },

                    },
                    area: {
                        zerobased: true,
                    },

                });

				//calculation
                var sumTemp = 0;
                var sumHum= 0;
                for (var j = 0; j < temps.length; j++) {
                    sumTemp += parseInt(temps[j], 10);
                    sumHum += parseInt(hums[j]*100, 10);
                }

                var avrTemp= sumTemp/temps.length;
                var avrHum= sumHum/hums.length;

                $scope.avrTemp = $filter('number')(avrTemp, 1);
                $scope.avrHum = $filter('number')(avrHum, 1);
                console.log($scope.avrTemp);
                console.log($scope.avrHum);
            },
            error: function (error) {
            	console.log(error);
                growl.error(error.message, {title: 'WE GOT AN ERROR'});
            }
        });
    }
});