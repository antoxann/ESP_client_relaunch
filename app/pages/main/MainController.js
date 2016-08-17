angular.module('myApp').controller("MainController",['$scope', 'AuthService', 'MeasurementService', 'ParseService', function ($scope, AuthService, MeasurementService, ParseService) {
    console.log("MainController");
    $scope.lastMeasure = [];

    MeasurementService.getLatestMeasurement(5)
    .then(function (result) {
    	$scope.lastMeasure = result;
    }, function (error) {
    	growl.error(error.message, {title: 'WE GOT AN ERROR'});
    });

}]);
