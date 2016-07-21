myApp.directive('device', function() {
  return {
    restrict: 'E',
    templateUrl: 'app/components/device/device.html',
    bindToController: {
    	device: '=obj'
    },
    controller: function ($scope) {
    	console.log($scope.device);
    }
  };
});