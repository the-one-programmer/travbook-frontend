app.controller("ProfileController",
  function($rootScope, $scope, $location, $http, $routeParams, current_user,$cookies) {
    // Initialize variables

    //$scope.profilePic="http://lorempixel.com/200/200/";

    $scope.data = {};
    $scope.currentTab = 0; // Set default tab to photos tab

    $rootScope.showNav = true;
    $rootScope.bodyClass = "";
    $rootScope.htmlClass = "st-layout ls-top-navbar ls-bottom-footer show-sidebar sidebar-l2";

    var currentUserURL = BACKEND_URL + 'current_user';

    $http({
      method: 'GET',
      url: currentUserURL,
      headers: {
        'Authorization': $cookies.get("Travbook_auth_token")//sessionStorage.getItem("auth_token")
      }
    })
    .success(function(data) {

      $scope.data.current_user_id = data.id;
      $rootScope.username = data.name;
      console.log($scope.data.current_user_id)
      if ($routeParams.id == $scope.data.current_user_id){
        $scope.isOwnProfile = true;
      }else{
        $scope.isOwnProfile = false;
      }

      // Get data of the profile currently being viewed
      profileURL = BACKEND_URL + 'show/' + $routeParams.id;
      $http({
        method: 'GET',
        url: profileURL,
        headers: {
          'Authorization': $cookies.get("Travbook_auth_token")
        },
      }).then(function successCallback(response) {
        $scope.user = response.data;

        $scope.isFollowing = $scope.isFollowing();
        $scope.isFollowed = $scope.isFollowed();

        $scope.genderIcon = 'fa fa-mars';

        if($scope.user.gender == "female")
        {
          $scope.genderIcon = 'fa fa-venus';
        }

        console.log($scope.user);

        $rootScope.title = "Profile for " + $scope.user.name;

        $scope.loadPosts();
      }, function errorCallback(response) {
        console.log(response);
        // TODO: Profile not found - show error
        $scope.changeView('/');
      });

      var nationURL = BACKEND_URL + "countries";
      $http.get(nationURL).success(function (data){
        $scope.data.nations = data;

      }).error(function(error){
        $scope.data.error = error;
      });

      var hobbyURL = BACKEND_URL + "interests";
      $http.get(hobbyURL).success(function (data){
        $scope.data.hobbies = data;
      }).error(function(error){
        $scope.data.error = error;
      });

      var languagesURL = BACKEND_URL + "languages";
      $http.get(languagesURL).success(function (data){
        $scope.data.languages = data;
      }).error(function(error){
        $scope.data.error = error;
      });
    }).error(function(error)
    {
      console.log(error);
    });

    $scope.loadPosts = function()
    {
        postsURL = BACKEND_URL + 'list_post/' + $scope.user.id;
        $http({
          method: 'POST',
          url: postsURL,
          headers: {
            'Authorization': $cookies.get("Travbook_auth_token")
          },
        }).then(function successCallback(response) {
          $scope.posts = response.data;
          console.log(response);
        }, function errorCallback(response) {
          console.log(response);
        });
    }

    $scope.showPost = function(post)
    {
        postURL = BACKEND_URL + 'show_post/' + post.id;
        $http({
          method: 'GET',
          url: postURL,
          headers: {
            'Authorization': $cookies.get("Travbook_auth_token")
          },
        }).then(function successCallback(response) {
          // TODO: Display post
          alert(post.content);
          console.log(response);
        }, function errorCallback(response) {
          console.log(response);
        });
    }

    $scope.repostPost = function(post)
    {
      repostURL = BACKEND_URL + 'repost/' + post.id.toString();
      $http({
        method: 'POST',
        url: repostURL,
        headers: {
          'Authorization': $cookies.get("Travbook_auth_token")
        }
      }).then(function successCallback(response) {
        $scope.alertClass = "alert-success";
        $scope.alertMessage = "Successfully reposted!";

        $scope.loadPosts();

        console.log(response);
      }, function errorCallback(response) {
        $scope.alertClass = "alert-danger";
        $scope.alertMessage = "Could not repost post. Please try again later.";
        console.log(response);
      });
    }

    $scope.likePost = function(post)
    {
      if($scope.postLiked(post))
      {
        unlikeURL = BACKEND_URL + 'unlike_post/' + post.id.toString();
        $http({
          method: 'POST',
          url: unlikeURL,
          headers: {
            'Authorization': $cookies.get("Travbook_auth_token")
          }
        }).then(function successCallback(response) {
          $scope.alertClass = "alert-success";
          $scope.alertMessage = "Successfully unliked!";

          $scope.loadPosts();
          
          console.log(response);
        }, function errorCallback(response) {
          $scope.alertClass = "alert-danger";
          $scope.alertMessage = "Could not unlike post. Please try again later.";
          console.log(response);
        });
      }
      else
      {
        likeURL = BACKEND_URL + 'like_post/' + post.id.toString();
        $http({
          method: 'POST',
          url: likeURL,
          headers: {
            'Authorization': $cookies.get("Travbook_auth_token")
          }
        }).then(function successCallback(response) {
          $scope.alertClass = "alert-success";
          $scope.alertMessage = "Successfully liked!";

          $scope.loadPosts();
          
          console.log(response);
        }, function errorCallback(response) {
          $scope.alertClass = "alert-danger";
          $scope.alertMessage = "Could not like post. Please try again later.";
          console.log(response);
        });
      }
    }

    $scope.postLiked = function(post)
    {
      for(var i = 0; i < post.likers.length; i ++)
      {
        if(post.likers[i].liker_id == $scope.data.current_user_id)
        {
          return true;
        }
      }

      return false;
    }

    $scope.postLikedStyle = function(post)
    {
      if($scope.postLiked(post))
      {
        return {"color": "red"};
      }
      else
      {
        return {};
      }
    }

    $scope.deletePost = function(post)
    {
      // TODO: Show alert on success/failure
      deletePostURL = BACKEND_URL + 'delete_post/' + post.id.toString();
      $http({
        method: 'POST',
        url: deletePostURL,
        headers: {
          'Authorization': $cookies.get("Travbook_auth_token")
        }
      }).then(function successCallback(response) {
        $scope.alertClass = "alert-success";
        $scope.alertMessage = "Successfully deleted post!";

        $scope.loadPosts();
        console.log(response);
      }, function errorCallback(response) {
        $scope.alertClass = "alert-danger";
        $scope.alertMessage = "Could not delete post. Please try again later.";
        console.log(response);
      });
    }

    $scope.wantsToGo = function(nation_id)
    {
      return $scope.user.countries_want_to_go.indexOf(nation_id) > -1
    }

    $scope.hasHobby = function(hobby_id)
    {
      return $scope.user.interests.indexOf(hobby_id) > -1
    }

    $scope.hasLanguage = function(language_id)
    {
      return $scope.user.languages.indexOf(language_id) > -1
    }

    $scope.isFollowing = function()
    {
      // Checks if the current user is following this profile
      for(i = 0; i < $scope.user.followers.length; i ++)
      {
        var follower = $scope.user.followers[i];

        if(follower.follower_id == $scope.data.current_user_id)
        {
          return true;
        }
      }

      return false;
    }

    $scope.isFollowed = function()
    {
      for(i = 0; i < $scope.user.followeds.length; i ++)
      {
        var follower = $scope.user.followeds[i];

        if(follower.followed_id == $scope.data.current_user_id)
        {
          return true;
        }
      }

      return false;
    }

    $scope.editProfile = function()
    {
      // User is viewing his own profile page
      if($routeParams.id == $scope.data.current_user_id)
      {
        // Redirect to editing page
        $scope.changeView('/edit');
      }
      else
      {
        // This should never happen as editing button is not displayed
      }
    }

    $scope.followUser = function()
    {
      var followUrl = BACKEND_URL + "follow";
      var followMessage = "follow";

      if($scope.isFollowing)
      {
        // If following, unfollow
        followUrl = BACKEND_URL + "unfollow"
        followMessage = "unfollow";
      }
      else
      {
        // Otherwise, follow
      }

      $http({
      method: 'POST',
      url: followUrl,
      headers: {
        'Authorization': $cookies.get("Travbook_auth_token")
        },
      data: { "user_id": $routeParams.id }
      }).then(function successCallback(response) {
        console.log(response);

        $scope.isFollowing = !$scope.isFollowing;

        // Reload user following list
        // Maybe this can be replaced with AJAX
        $scope.updateProfile();

        $scope.alertClass = "alert-success";
        $scope.alertMessage = "Successfully " + followMessage + "ed!";
      }, function errorCallback(response) {
        console.log("error")
        console.log(response);

        // Show error message
        $scope.alertClass = "alert-danger";
        $scope.alertMessage = "Could not " + followMessage + " user. Please try again later.";
      });
    }

    $scope.changeView = function(url)
    {
      $location.path(url);
    }

    $scope.viewProfile = function(profile_id)
    {
      var profilePath = "/profile/" + profile_id.toString() + "/";
      $location.path(profilePath);
    }

    $scope.updateProfile = function()
    {
        profileURL = BACKEND_URL + 'show/' + $routeParams.id;
        $http({
          method: 'GET',
          url: profileURL,
          headers: {
            'Authorization': $cookies.get("Travbook_auth_token")
          },
        }).then(function successCallback(response) {
          $scope.user = response.data;
          //$scope.user.followers = response.data.followers;
          //$scope.user.followeds = response.data.followeds;

          $scope.isFollowing = $scope.isFollowing();
          $scope.isFollowed = $scope.isFollowed();
        }, function errorCallback(response) {
          console.log(response);
        });
    }
});

// Filter that capitalizes the first letter of a word
app.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});
