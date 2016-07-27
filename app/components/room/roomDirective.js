myApp.directive('room', function() {
  return {
    restrict: 'E',
    templateUrl: 'room',
    bindToController: {
    	room: '=obj'
    },
    controller: function ($scope) {
    	console.log($scope.room);
    }
  };
});