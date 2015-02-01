angular.module('photoShare.controllers.users', [])

.controller('RegisterCtrl', function($scope, $ionicPopup, $ionicLoading, User){
	$scope.username = { value: '' };
	$scope.email = { value: '' };
	$scope.password = { value: '' };

	$scope.doRegister = function(){
		if($scope.username.value && $scope.email.value && $scope.password.value){
			$ionicLoading.show({
		    	template: 'Loading...'
		    });

			var data = {
				username: $scope.username.value,
				email: $scope.email.value,
				password: $scope.password.value
			};

			User.register(data).success(function(data){
				$ionicLoading.hide();
				if(data.status == "error"){
					var alertPopup = $ionicPopup.alert({
					    title: 'Error',
					    template: data.message
					});
					return;
				}

				alert("User added")
			});
		}
	}
})
.controller('LoginCtrl', function($scope, $ionicPopup, $ionicLoading, User){
	console.log('User ctrl');

	$scope.email = { value: '' };
	$scope.password = { value: '' };

	$scope.doLogin = function(){
		if($scope.email.value && $scope.password.value){
			$ionicLoading.show({
	    		template: 'Loading...'
	    	});
 
			var data = {
				email: $scope.email.value,
				password: $scope.password.value
			}

			User.login(data).success(function(data){
				$ionicLoading.hide();

				if(data.status == "ok"){
					// Save user logged data for test
					var user = {
						name: data.user.username,
					    avatar: data.user.avatar,
						token: data.user.app_token
					};

					localStorage.setItem("user", JSON.stringify(user));
					alert("You are in ");
					return;
				}

				if(data.status == "error"){
					var alertPopup = $ionicPopup.alert({
					    title: 'Error',
					    template: 'Email o password incorrect'
					});
					return;
				}
			});	
		}
	}
})	