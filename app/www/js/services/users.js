angular.module('photoShare.services.users', [])
.factory('User', function($http, URL){

	var _login = function(data){
		return $http({
	      method: "POST",
	        url: URL.DEV + "/users/login",
	        data: $.param({'data' : data}),
	        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	    });
	};

	var _register = function(data){
		return $http({
	      method: "POST",
	        url: URL.DEV + "/users/register",
	        data: $.param({'data' : data}),
	        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	    });
	};

	return{
		login: _login,
		register: _register
	}
});