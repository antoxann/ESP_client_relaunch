angular.module('myApp').factory('AuthService', ['ParseService', '$state', 'growl', function(ParseService, $state, growl) {
  	var userObj = {};

  	function isLoggedIn () {
  		if (Parse.User.current() && Object.keys(Parse.User.current()).length > 0) {
			return true
		} else {
			return false
		}
  	};

  	if (isLoggedIn()) {
	    userObj = Parse.User.current().toJSON();
  	}

  	function signup (username, email, password) {
  		var user = new Parse.User({
  			username: username,
  			password: password,
  			email: email,
  			utcTime: new Date()
  		});

		user.signUp(null, {
		  success: function(userModel) {
		    userObj = Parse.User.current().toJSON();
		    $state.go('app.main');
		    console.log(userObj);
		  },
		  error: function(user, error) {
		  	console.log(error);
		    growl.error(error.message, {title: 'WE GOT AN ERROR'});
		  }
		});
  	}

  	function signin (username, password) {
  		Parse.User.logIn(username, password, {
	        success: function (userModel) {
	            userObj = Parse.User.current().toJSON();
	           	$state.go('app.main');
		    	console.log(userObj);
	        },
	        error: function (user, error) {
	        	console.log(error);
	            growl.error(error.message, {title: 'WE GOT AN ERROR'});

	        }
	    });
  	}

  	function getCurrentUser () {
  		return userObj;
  	}

  	function logout () {
  		return Parse.User.logOut();
  	}

	return {
		isLoggedIn : isLoggedIn,
		signup : signup,
		signin : signin,
		getCurrentUser : getCurrentUser,
		logout : logout
	}
}]);