angular.module('myApp').factory('AuthService', function(ParseService, $state, growl) {
  	var userObj = {};

  	function isLoggedIn () {
  		if (Parse.User.current() && Object.keys(Parse.User.current()).length > 0) {
			return true
		} else {
			return false
		}
  	};

  	if (isLoggedIn()) {
  		var userModel = Parse.User.current()
  		userObj.id = userModel.id;
	    userObj.name = userModel.get('name');
	    userObj.lastName = userModel.get('lastName');
	    userObj.location = userModel.get('location');
	    userObj.city = userModel.get('city');
	    userObj.utcTime = userModel.get('utcTime');
	    userObj.email = userModel.get('email');
	    userObj.username = userModel.get('username');
  	}

  	function signup (username, email, password) {
  		var user = new Parse.User();
		user.set("username", username);
		user.set("password", password);
		user.set("email", email);
		user.set("utcTime", new Date());

		user.signUp(null, {
		  success: function(userModel) {
		    userObj.id = userModel.id;
		    userObj.name = userModel.get('name');
		    userObj.lastName = userModel.get('lastName');
		    userObj.location = userModel.get('location');
		    userObj.city = userModel.get('city');
		    userObj.utcTime = userModel.get('utcTime');
		    userObj.email = userModel.get('email');
		    userObj.username = userModel.get('username');
		    $state.go('app.main');
		    console.log(user);
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
	            userObj.name = userModel.get('name');
			    userObj.lastName = userModel.get('lastName');
			    userObj.location = userModel.get('location');
			    userObj.city = userModel.get('city');
			    userObj.utcTime = userModel.get('utcTime');
			    userObj.email = userModel.get('email');
			    userObj.username = userModel.get('username');
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
});