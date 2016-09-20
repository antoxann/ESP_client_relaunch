angular.module('myApp').controller("ProfileController",['$scope', 'JqueryProfileService', 'AuthService', 'growl', 'ParseService', function ($scope, JqueryProfileService, AuthService, growl, ParseService) {
	console.log("ProfileController");
	var User = Parse.Object.extend("User");

	$scope.user = AuthService.getCurrentUser();
	var userOld = angular.copy($scope.user);

	$scope.editProfile = function (user) {
		var userModel = new User({
			id: user.objectId,
			name: user.name,
			lastName: user.lastName,
			location: user.location,
			city: user.city,
			utcTime: user.utcTime,
			email: user.email,
			username: user.username
		});

		userModel.save({
			success: function (user) {
				growl.success('Your profile was edited successfully', { title: 'Profile updated!'});
			},
			error: function (user, error) {
				$scope.user = userOld;
				growl.error(error.message, {title: 'WE GOT AN ERROR'});
			}
		});
	}
}]);