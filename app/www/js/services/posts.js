var urlDev = 'http://192.168.1.35:8888/posts';
var urlProd = 'http://photoshare-siteapps.rhcloud.com/posts';

angular.module('photoShare.services.posts', [])
.factory('Post', function($http, URL){

	var _all = function(offset){
		return $http.get(URLSERVER + 'posts?offset=' + offset)
		//return $http.get('http://photoshare-siteapps.rhcloud.com/posts')
	};

	var _like = function(postId){
		return $http.post(URLSERVER + "posts/" + postId + "/like");
	}

	return{
		all: _all,
		like: _like
	}

});

