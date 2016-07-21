myApp.directive('room', function() {
  return {
    restrict: 'E',
    templateUrl: 'app/components/room/room.html',
    bindToController: {
    	room: '=obj'
    },
    controller: function ($scope) {
    	console.log($scope.room);
    }
  };
});