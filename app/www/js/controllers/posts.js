angular.module('photoShare.controllers.posts', [])

.controller('PostsCtrl', function($scope, $rootScope, $ionicLoading, 
								  $ionicPopup, Post, URL){
	var offset = 0;
	$scope.url = URLSERVER;


	function getPost(offset, callback){
		$ionicLoading.show({
	      template: 'Loading...'
	    });

		Post.all(offset).success(function(posts){
			$ionicLoading.hide();
			//$rootScope.posts = posts;
			callback(posts);
			
		});
	}

	getPost(offset, function(posts){
		$rootScope.posts = posts;
	});

	$scope.doRefresh = function(){
		getPost(0, function(){});
	};

	$scope.loadMore = function(){
		console.log("Load more")
		offset = offset + 5;
		getPost(offset, function(posts){
			console.log($rootScope.posts)
			
			angular.forEach(posts, function(post, index){
				$rootScope.posts.push(post);
			});
			console.log($rootScope.posts)
		});
		setTimeout(function(){
			$scope.$broadcast('scroll.infiniteScrollComplete');
		}, 3000)
	};

	$scope.likePost = function($index, postId){
		Post.like(postId).success(function(data){
			$rootScope.posts[$index].likes = $rootScope.posts[$index].likes + 1;
		});
	};

	$scope.openModalOptions = function(){
		 var alertPopup = $ionicPopup.show({
		    title: '',
		    template: '<p>Marcar como inapropiado</p><p>Compartir</p>',
		    buttons: [{
		    	text: 'Close',
		    	onTap: function(){

		    	}
		    }]
		});


		alertPopup.then(function(res) {
		    console.log('Thank you for not eating my delicious ice cream cone');
		});
	}
})



;