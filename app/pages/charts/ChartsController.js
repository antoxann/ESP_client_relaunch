angular.module('myApp').controller("ChartsController", function ($scope, $filter, RoomService) {
	//inititate first start
    var toInit = new Date();
    var fromInit = new Date();
    toInit.setHours(23,59,59,59);
    fromInit.setHours(0,0,0,0);
    $scope.toInit = $filter('date')(toInit, 'medium');
    $scope.fromInit = $filter('date')(fromInit, 'medium');

    getChartData(toInit, fromInit, 0);

    //get rooms for room picker
    RoomService.getRooms().then(function (rooms) {
        $scope.rooms = rooms;
    }, function (error) {
        console.log(error);
        growl.error(error.message, {title: 'ALERT WE GOT AN ERROR'});
    })

    function getChartData(to, from, roomId) {
    	//update variables
        $scope.toInit = $filter('date')(to, 'medium');
    	$scope.fromInit = $filter('date')(from, 'medium');

    	if (!roomId) {
    		roomId = 0;
    	}
		Parse.Cloud.run('chartData', { to: to, from: from, roomId: roomId }).then(function(res) {
		 	var result = res.chartData.map(function (item) {
		 		item.temp = $filter('number')(item.temp, 1);
		 		item.presence = $filter('number')(item.presence, 0)*0.1;
		 		return item;
		 	})
    		genChart(result);
		});
    }
    //for correct processing roomId - it can be seted by user or not
    function getRoomId () {
    	var roomId;
    	if (!$scope.room) {
    		roomId = 0;
    	} else {
    		roomId = $scope.room.id;
    	}
    	return roomId;
    }

    //for update chart with new dates
    $scope.updateChart = function () {
    	if ($scope.newTo && $scope.newFrom) {
    		var to = new Date($scope.newTo);
    		var from  = new Date($scope.newFrom);
    		to = new Date(to.setHours(23,59,59,59));
    		from = new Date(from.setHours(0,0,0,0));
    		var roomId = getRoomId();
    		getChartData(to, from, roomId);
    	}
    	
    }

    //for today button on the view
    $scope.today = function () {
    	var roomId = getRoomId();
    	getChartData(toInit, fromInit, roomId);
    }

    function genChart (data) {
    	chart = c3.generate({
	        data: {
	            json: data,
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
    }
	
});