angular.module('myApp').controller("SimulationController", function ($scope, RoomService, $filter) {
	console.log("SimulationController");

	//get rooms for room picker
    RoomService.getRooms().then(function (rooms) {
        $scope.rooms = rooms;
    }, function (error) {
        console.log(error);
        growl.error(error.message, {title: 'ALERT WE GOT AN ERROR'});
    })


    $scope.selectedRoom = "";
    $scope.days = 7;
    $scope.precision = 2.5;

    $scope.factor=2;

    // $scope.$watch('selectedRoom', function(newValue,oldValue) {
    //     if (newValue !== oldValue) {
    //         $scope.P = 100000;
    //     }
    // });


    // Energy:
    $scope.h =3; // m (h)
    $scope.d= 1.225;// km/m3
    $scope.c=1005;// J/Kg*K
    $scope.price= 0.9; // euro/m3
    $scope.H = 37.09; //MJ/m3

    sim();

    $scope.$watch('selectedRoom', function(newValue,oldValue) {
        if (newValue !== oldValue) {
            console.log(newValue);
        }
    });


    function sim() {
        var precision= $scope.precision;
        var room = $scope.selectedRoom;
        var data = $scope.days;
        var sim = [];
        var Tmin = 1000;
        var Tmax = 0;
        var fromInit = new Date();
        fromInit.setDate(fromInit.getDate()-data);
        fromInit.setHours(0,0,0,0);

        var measure = Parse.Object.extend("Measurement");
        var query = new Parse.Query(measure);
        query.descending("createdAt");
        query.greaterThanOrEqualTo("createdAt", fromInit);
        query.limit(5000);
        query.exists("roomId");
        query.include("roomId");
        if(room != "") {
        	console.log(room.id);
            query.equalTo("roomId",{"__type":"Pointer","className":"Room","objectId":room.id});
        }
        query.find().then(function (objects) {
        		console.log(objects);

                var data = new Array(24);
                var count=new Array(24);
                 var temp =new Array(24);
            for (var k = 0; k < 24; k++) {
                data[k]=0;
                count[k]=0;
                temp[k]=0;
            }
            console.log(1);
                for (var i = 0; i < objects.length; i++) {
                    var tmin=objects[i].get("roomId").get("tempMin");
                    var tmax=objects[i].get("roomId").get("tempMax");

                    if(tmin < Tmin){
                    	console.log(11111111111111111111111111111);
                    	console.log(tmin, " ", Tmin);
                        Tmin=tmin;
                    }
                    if(tmax > Tmax){
                    	console.log(2222222222222222222222222222222);
                    	console.log(tmax, " ", Tmax);
                        Tmax = tmax;
                    }

                    var h=$filter('date')(objects[i].createdAt, 'H');
                    var t= objects[i].get("temp");
                    var p= objects[i].get("presence");
                    data[h]+= p;
                    temp[h]+= t;
                    count[h]++;
                }
               console.log(2);
               console.log(Tmin, ' ', Tmax);
            for (var z = 0; z < 24; z++) {
                var tp=$filter('number')(temp[z]/count[z], 1);
                if(data[z]==0 || data[z]/count[z]<precision){
                    sim.push({
                        t: z,
                        presence:0,
                        temp:tp,
                        Tmin: Tmin,
                        Tmax:Tmax,
                        Tnew:Tmin,
                    });
                }else{
                    var pr=$filter('number')(data[z]/count[z], 1)*0.1;
                    var f=0;
                    if (pr*$scope.factor > 1){
                        f =1;
                    }else{
                        f= pr*$scope.factor;
                    }
                    var tnew=Tmin+(Tmax-Tmin)*f;
                    sim.push({
                        t: z,
                        presence:pr,
                        temp: tp,
                        Tmin: Tmin,
                        Tmax:Tmax,
                        Tnew: tnew,
                    });
                }
            }

            console.log(3);

                var k=JSON.stringify(data);
                var j=JSON.stringify(count);
            var jj= JSON.stringify(temp);
            var s=JSON.stringify(sim);
            console.log(4);
            console.log(sim);
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
            $scope.Tmin=Tmin;
            $scope.Tmax=Tmax;
            $scope.simulation=s;

            }
        ).then(function() {
            var r = Parse.Object.extend("Room");
            var query2 = new Parse.Query(r);
            query2.limit(20);
            if($scope.selectedRoom != ""){
                query2.equalTo("objectId", $scope.selectedRoom.id);
            }
            query2.find().then(function (objects) {
                var A=0;
                for (var i = 0; i < objects.length; i++) {
                	console.log(objects[i].get('area'));
                    A += objects[i].get('area');
                }
                $scope.A=A;
                $scope.R=R()+"%";
                $scope.P=P(A)+" euro/month";

                $scope.$apply();

            })

        });
    }

    //////////////////////////////////////////////
    function R(){
        var sim = JSON.parse($scope.simulation);
        var r=0;
        var count=0;
        for (var i = 0; i < sim.length; i++) {
            var Tmax= sim[i].Tmax;
            var Tnew= sim[i].Tnew;
            r+= 1-(Tnew/Tmax);
            count++;
        }
        var R=$filter('number')(r/count, 2)*(-100);
        return R;
    }

    function P(area){
        console.log("area: "+area)
        var sim = JSON.parse($scope.simulation);
        var E=0;
        var A=area;
        var h =$scope.h;
        var d= $scope.d;
        var m= A * h * d;
        var c=$scope.c;
        var e=m*c;
        var price= $scope.price;
        var H = $scope.H;

        for (var i = 0; i < sim.length; i++) {
            var Tmax= sim[i].Tmax;
            var Tnew= sim[i].Tnew;
            E+=e*(Tmax-Tnew);
        }

        var P = $filter('number')(E*price/H/1000000*30, 1);
        return P;
    }

    $scope.update = function(){
        sim();
    }

});