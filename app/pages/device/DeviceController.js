angular.module('myApp').controller("DeviceController", [ '$scope', '$stateParams', function ($scope, $stateParams) {
	$scope.device = $stateParams.device;
}]);