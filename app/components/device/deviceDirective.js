myApp.directive('device', function() {
  return {
    restrict: 'E',
    templateUrl: 'app/components/device/device.html',
    link: function (scope, element, attrs) {
    	if (attrs.device)
    		scope.device = scope.$eval(attrs.device);
    }
  };
});