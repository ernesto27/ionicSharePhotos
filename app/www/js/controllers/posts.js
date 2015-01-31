angular.module('photoShare.controllers.home', [])

.controller('PostsCtrl', function($scope, $rootScope, $ionicLoading, Post, URL){
	var offset = 0;

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
		getPost(offset + 5, function(posts){
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

	$scope.likePost = function(){
		$scope.clickedLike = 'activated';
		$scope.$apply();
	};
})

.controller('CommentsCtrl', function($scope){
	var users = [{
	    id: 0,
	    name: 'Ben Sparrow',
	    lastText: 'You on your way?',
	    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
	  }, {
	    id: 1,
	    name: 'Max Lynx',
	    lastText: 'Hey, it\'s me',
	    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
	  }, {
	    id: 2,
	    name: 'Andrew Jostlin',
	    lastText: 'Did you get the ice cream?',
	    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
	  }, {
	    id: 3,
	    name: 'Adam Bradleyson',
	    lastText: 'I should buy a boat',
	    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
	  }, {
	    id: 4,
	    name: 'Perry Governor',
	    lastText: 'Look at my mukluks!',
	    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
	  },
	  {
	    id: 0,
	    name: 'Ben Sparrow',
	    lastText: 'You on your way?',
	    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
	  }

	 ];

	$scope.users = users;
})

;