app.controller("ProfileController",
  function($rootScope, $scope, $location, $http, $routeParams, current_user,$cookies) {
    // Initialize variables

    //$scope.profilePic="http://lorempixel.com/200/200/";

    $scope.data = {};
    $scope.currentTab = 2; // Set default tab to journal tab

    $rootScope.showNav = true;
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
    });


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

      $rootScope.username = $scope.user.name;
      $scope.genderIcon = 'fa fa-mars';

      if($scope.user.gender == "female")
      {
        $scope.genderIcon = 'fa fa-venus';
      }

      console.log($scope.user);

      $rootScope.title = "Profile for " + $scope.user.name;
    }, function errorCallback(response) {
      console.log(response);
      // TODO: Profile not found - show error
      $scope.changeView('/');
    });

    if ($routeParams.id.to_i == $scope.data.current_user_id){
      console.log($scope.data.current_user_id)
      $scope.isEditable = true;
    }else{
      $scope.isEditable = false;
    }

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
      for(i = 0; i < $scope.user.followers.length; i ++)
      {
        var follower = $scope.user.followers[i];

        if(follower.follower_id.to_i == $scope.current_user_id.to_i)
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

        if(follower.followed_id.to_i == $scope.current_user_id.to_i)
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
});

// Filter that capitalizes the first letter of a word
app.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});
