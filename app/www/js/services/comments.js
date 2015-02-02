angular.module('photoShare.services.comments', [])
.factory('Comment', function($http, URL){
	var _getByIdPost = function(postId){
		return $http.get( URLSERVER + "comments/post/" + postId );
	};


	var _add = function(postId, data){
		return $http({
	      method: "POST",
	        url: URLSERVER + "comments/post/" + postId,
	        data: $.param({'data' : data}),
	        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	    });
	};

	return{
		getByIdPost: _getByIdPost,
		add : _add
	}
});