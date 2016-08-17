angular.module('myApp').controller("SimulationController", ['$scope', 'RoomService', '$filter', function ($scope, RoomService, $filter) {
	//get rooms for room picker
    RoomService.getRooms().then(function (rooms) {
        $scope.rooms = rooms;
    }, function (error) {
        console.log(error);
    })

    $scope.selectedRoom = "";
    $scope.days = 7;
    $scope.precision = 2.5;
    $scope.factor=2;

    // Energy:
    $scope.h =3; // m (h)
    $scope.d= 1.225;// km/m3
    $scope.c=1005;// J/Kg*K
    $scope.price= 0.9; // euro/m3
    $scope.H = 37.09; //MJ/m3

    function buildChart () {
    	var fromInit = new Date();
    	fromInit.setDate(fromInit.getDate() - $scope.days);
    	fromInit.setHours(0,0,0,0);

        var roomId;
        if ($scope.selectedRoom !== '') {
        	roomId = $scope.selectedRoom.id;
        } else {
        	roomId = '';
        }
        Parse.Cloud.run('simulation', { fromInit: fromInit, roomId: roomId, precision: $scope.precision, days: $scope.days, h: $scope.h, d: $scope.d, c: $scope.c, price: $scope.price, H: $scope.H})
        .then(function(res) {
        	genChart(res.sim);
        	$scope.Tmin = res.Tmin;
        	$scope.Tmax = res.Tmax;
        	$scope.A = res.A;
            $scope.R = res.R;
            $scope.P = res.P;

            $scope.$apply();
	 	})
    }

    //initiate bild chart on page opened
    buildChart();

    //for update,refresh buttons
    $scope.updateChart = function () {
    	buildChart();
    }

    //genereting graph
    function genChart (sim) {
    	chart = c3.generate({
	        data: {
	            json: sim,
	            keys: {
	                // x: 'name', // it's possible to specify 'x' when category axis
	                x: 't',
	                value: [ 'temp','presence','Tmin','Tmax','Tnew'],
	            },

	            axes: {
	                temp: 'y',
	                presence: 'y2',
	            },
	            types: {
	                temp: 'area-step',
	                presence:'bar',
	                Tmin:'line',
	                Tmax:'line',
	                Tnew:'area-step',
	            },
	            colors: {
	                temp: '#ec971f',
	                Tmin: '#BDBDBD',
	                Tmax:'#BDBDBD',
	            }

	        },
	        axis: {
	            x: {
	                type: 'timeseries',
	                tick: {
	                    format: d3.format("d"),
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

	        point: {
	            show: false
	        }
	    });
    }
}]);