myApp.directive('device', function() {
  return {
    restrict: 'E',
    templateUrl: 'device',
    bindToController: {
    	device: '=obj'
    },
    controller: function ($scope, JqueryService, growl) {
    	console.log($scope.device);

        $scope.editDevice = function (device) {
            console.log(device);
        }
    }
  };
});