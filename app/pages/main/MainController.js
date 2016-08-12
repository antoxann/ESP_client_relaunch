angular.module('myApp').controller("MainController", function ($scope, AuthService, MeasurementService) {
    console.log("MainController");
    $scope.lastMeasure = [];

    MeasurementService.getLatestMeasurement(5)
    .then(function (result) {
    	$scope.lastMeasure = result;
    }, function (error) {
    	growl.error(error.message, {title: 'WE GOT AN ERROR'});
    });
    
});
