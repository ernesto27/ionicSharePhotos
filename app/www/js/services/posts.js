angular.module('photoShare.services.posts', [])
.factory('Post', function($http){

	var _all = function(){
		return $http.get('http://192.168.1.33:8888/posts')
		//return $http.get('http://photoshare-siteapps.rhcloud.com/posts')
	};

	return{
		all: _all
	}

});

