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
})

.controller('CommentsCtrl', function($scope){
	var users = [{
	    id: 0,
	    name: 'Ben Sparrow',
	    comment: 'You on your way?',
	    avatar: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
	  }, {
	    id: 1,
	    name: 'Max Lynx',
	    comment: 'Hey, it\'s me',
	    avatar: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
	  }, {
	    id: 2,
	    name: 'Andrew Jostlin',
	    comment: 'Did you get the ice cream?',
	    avatar: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
	  }, {
	    id: 3,
	    name: 'Adam Bradleyson',
	    comment: 'I should buy a boat',
	    avatar: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
	  }, {
	    id: 4,
	    name: 'Perry Governor',
	    comment: 'Look at my mukluks!',
	    avatar: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
	  },
	  {
	    id: 0,
	    name: 'Ben Sparrow',
	    comment: 'You on your way?',
	    avatar: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
	  }
	  , {
	    id: 4,
	    name: 'Perry Governor',
	    comment: 'Look at my mukluks!',
	    avatar: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
	  },
	  {
	    id: 0,
	    name: 'Ben Sparrow',
	    comment: 'You on your way?',
	    avatar: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
	  }
	  , {
	    id: 4,
	    name: 'Perry Governor',
	    comment: 'Look at my mukluks!',
	    avatar: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
	  },
	  {
	    id: 0,
	    name: 'Ben Sparrow',
	    comment: 'You on your way?',
	    avatar: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
	  }
	  , {
	    id: 4,
	    name: 'Perry Governor',
	    comment: 'Look at my mukluks!',
	    avatar: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
	  },
	  {
	    id: 0,
	    name: 'Ben Sparrow',
	    comment: 'You on your way?',
	    avatar: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
	  }

	 ];

	$scope.users = users;
	//$scope.users = [];

	$scope.comment = { value: '' };


	$scope.addComment = function(){
		if($scope.comment.value){
			

			var user = JSON.parse(localStorage.getItem('user'));
			var commentObj = {
				user: user.name,
				comment: $scope.comment.value ,
				avatar: user.avatar

			}
			console.log($scope.comment.value )
			$scope.users.splice(0, 0, commentObj);
		}
	
	}
})

;