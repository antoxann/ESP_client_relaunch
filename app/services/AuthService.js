myApp.factory('AuthService', function(ParseService, $state) {
  	var user = {};
	return {
		isLoggedIn : function () {
			if (Object.keys(user).length > 0) {
				return true
			} else {
				return false
			}
		},
		signup : function (username, email, password) {
			var User = Parse.Object.extend("User");
			//var query = new Parse.Query(User);
	 		var user = new Parse.User();
			user.set("username", username);
			user.set("password", password);
			user.set("email", email);

			user.signUp(null, {
			  success: function(userModel) {
			    user = userModel;
			    $state.go('app.main');
			    console.log(user);
			  },
			  error: function(user, error) {
			  	console.log(error);
			    // Show the error message somewhere and let the user try again.
			    alert("Error: " + error.code + " " + error.message);
			  }
			});
		},
		signin : function (username, password) {
			Parse.User.logIn(username, password, {
	            success: function (userModel) {
	                user = userModel;
	               	$state.go('app.main');
			    	console.log(user);
	            },
	            error: function (user, error) {
	            	console.log(error);
	                alert("Error: " + error.code + " " + error.message);

	            }
	        });
		},
		getCurrentUser : function () {
			return user;
		},
		getCurrentUser2 : function () {
			return Parse.User.current();
		}
	}
});