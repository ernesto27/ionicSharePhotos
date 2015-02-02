angular.module('photoShare.controllers.comments', [])
.controller('CommentsCtrl', function($scope, $stateParams, Comment){
	var postId = $stateParams.id;
	$scope.url = URLSERVER;
	
	Comment.getByIdPost(postId).success(function(comments){
		console.log(comments)
		$scope.comments = comments;
	});


	$scope.comment = { value: '' };
	$scope.addComment = function(){
		if($scope.comment.value){
			var user = JSON.parse(localStorage.getItem('user'));
			var commentObj = {};
			commentObj.User = {
				username: user.name,
				avatar: user.avatar
			}
			commentObj.comment = $scope.comment.value;

			Comment.add(postId , { userId: user.id, comment: $scope.comment.value }).success(function(data){
				$scope.comments.splice(0, 0, commentObj);
			});

		}
	
	}
})