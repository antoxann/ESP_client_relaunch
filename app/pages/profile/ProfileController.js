angular.module('myApp').controller("ProfileController", function ($scope, JqueryProfileService, AuthService, growl, ParseService) {
	console.log("ProfileController");
	var User = Parse.Object.extend("User");

	$scope.user = AuthService.getCurrentUser();
	console.log($scope.user);

	$scope.editProfile = function (user) {
		var userModel = new User();
		userModel.id = user.id;
		userModel.set("name", user.name);
		userModel.set("lastName", user.lastName);
		userModel.set("location", user.location);
		userModel.set("city", user.city);
		userModel.set("utcTime", user.utcTime);
		userModel.set("email", user.email);

		userModel.save({
			success: function (user) {
				growl.success('Your profile was edited successfully', { title: 'Profile updated!'});
			},
			error: function (user, error) {
				console.log(error);
				growl.error(error.message, {title: 'WE GOT AN ERROR'});
			}
		});
	}
});