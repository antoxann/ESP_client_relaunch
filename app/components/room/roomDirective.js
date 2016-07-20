myApp.directive('room', function() {
  return {
    restrict: 'E',
    templateUrl: 'app/components/room/room.html',
    link: function (scope, element, attrs) {
    	if (attrs.room) {
    		scope.room = scope.$eval(attrs.room);
    	}
    }
  };
});