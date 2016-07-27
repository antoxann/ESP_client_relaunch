myApp.directive('device', function() {
  return {
    restrict: 'E',
    templateUrl: 'device',
    bindToController: {
    	device: '=obj'
    },
    controller: function ($scope) {
    	console.log($scope.device);
    }
  };
});