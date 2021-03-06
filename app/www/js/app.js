var dev = "http://192.168.1.34:8888/";
var prod = "http://photoshare-siteapps.rhcloud.com/";
var URLSERVER = dev;

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('photoShare', ['ionic', 
                              'photoShare.controllers','photoShare.controllers.posts', 'photoShare.controllers.users', 
                              'photoShare.controllers.comments', 
                              'photoShare.services', 'photoShare.services.users', 'photoShare.services.posts',
                              'photoShare.services.comments',
                              'angularMoment'])
.constant("URL",{
    "DEV": "http://192.168.1.35:8888/",
    "PROD": "http://photoshare-siteapps.rhcloud.com/"
})

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
	if (window.cordova && window.cordova.plugins.Keyboard) {
		cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
	}
	if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
  }
});
})

// ionic run android --target=580400ef

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider ) {

  // Put tab in botton
  $ionicConfigProvider.tabs.position("bottom");

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive

 
  .state('login', {
    url: '/login',
    templateUrl: "templates/login.html",
    controller: 'LoginCtrl'
  })

  .state('register', {
    url: '/register',
    templateUrl: "templates/register.html",
    controller: 'RegisterCtrl'
  })



  .state('tab', {
  	url: "/tab",
  	abstract: true,
  	templateUrl: "templates/tabs.html"
  })





  // Each tab has its own nav history stack:

  .state('tab.posts', {
    url: '/posts',
    views: {
      'tab-posts': {
        templateUrl: 'templates/tab-posts.html',
        controller: 'PostsCtrl'
      }
    }
  })

  .state('tab.postcomments', {
    url: '/post/:id/comments',
    views: {
      'tab-posts': {
        templateUrl: 'templates/tab-post-comments.html',
        controller: 'CommentsCtrl'
      }
    }
  })


  .state('tab.friends', {
    url: '/friends',
    views: {
      'tab-friends': {
        templateUrl: 'templates/tab-friends.html',
        controller: 'FriendsCtrl'
      }
    }
  })
  .state('tab.friend-detail', {
    url: '/friend/:friendId',
    views: {
      'tab-friends': {
        templateUrl: 'templates/friend-detail.html',
        controller: 'FriendDetailCtrl'
      }
    }
  })

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.upload', {
  	url: '/upload',
  	views: {
  		'tab-upload': {
  			templateUrl: 'templates/tab-upload.html',
  			controller: 'ChatsCtrl'
  		}
  	}
  })
  .state('tab.chat-detail', {
  	url: '/chats/:chatId',
  	views: {
  		'tab-chats': {
  			templateUrl: 'templates/chat-detail.html',
  			controller: 'ChatDetailCtrl'
  		}
  	}
  })

  
  

  .state('tab.account', {
  	url: '/account',
  	views: {
  		'tab-account': {
  			templateUrl: 'templates/tab-account.html',
  			controller: 'AccountCtrl'
  		}
  	}
  });

  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/tab/posts');
  //$urlRouterProvider.otherwise('/login');

})
.controller('AppCtrl', function($scope, $rootScope, $http, 
                                $ionicLoading, $timeout, $location) {

  console.log("Main controller")
  // Check if user is logged
  if(localStorage.getItem('user')){
    $location.path('/tab/posts');
  }else{
    $location.path('/login');
  }
  
  $scope.uploadPhoto = function(){
    // Show loading
    $ionicLoading.show({
      template: 'Loading...'
    });


    navigator.camera.getPicture(onSuccess, onFail, { 
        quality: 80,
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 800,
        targetHeight: 600,
        correctOrientation: true 
      });
       
      function onSuccess(imageData) {
          $http({
            method: "POST",
              //url: "http://192.168.1.35:8888/posts",
              url: "http://photoshare-siteapps.rhcloud.com/posts",
              data:  $.param({'data' : {imageData: imageData} }),
              //data:  imageData,
              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }).success(function(data){
            //alert(data)
            // Add new post to list
            $ionicLoading.hide();
            $rootScope.posts.splice(0, 0, data)
          }).error(function(err){
            alert(err)
          })
      }
       
      function onFail(message) {
          alert('Failed because: ' + message);
      }
    }
})

;
