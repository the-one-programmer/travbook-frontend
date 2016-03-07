app.controller("NewsFeedController",
  function($scope, $rootScope, $http, $location, $timeout, current_user,$cookies) {

  $scope.profilePic="http://lorempixel.com/200/200/";

  $scope.data = {};
  $scope.currentTab = 0;

  $rootScope.showNav = true;
  $rootScope.title = "TravBook";
  $rootScope.htmlClass = "st-layout ls-top-navbar ls-bottom-footer show-sidebar sidebar-l2";
  $rootScope.bodyClass = "";

  var currentUserURL = BACKEND_URL + 'current_user';

  $http({
    method: 'GET',
    url: currentUserURL,
    headers: {
      'Authorization': $cookies.get("Travbook_auth_token")//sessionStorage.getItem("auth_token")
    }
  })
  .success(function(data) {
        // Move load of data here
    // Current user ID - only if user is logged in
    $scope.data.current_user_id = data.id;
    $rootScope.username = data.name;

    console.log(data.id);

    $scope.newStatus = "";
    $scope.newReply = "";

    var recommendationURL = BACKEND_URL + 'recommend';

    $http({
    method: 'GET',
    url: recommendationURL,
    headers: {
      'Authorization': $cookies.get("Travbook_auth_token")//sessionStorage.getItem("auth_token")
      }
    })
    .success(function(data) {
      console.log(data);
      $scope.recommendations = data.users;
    })
    .error(function(response) {
      console.log(response);
    });

    $scope.loadPosts();

    //$scope.news = [{ title: "Fake status 1", content: "Blah blah blah"},
    //              { title: "Fake status 2", content: "Blah blah blah"},];

    var getCountryForCityName = function(cityName)
    {
      for(var i = 0; i < $scope.data.nations.length; i++)
      {
        var country = $scope.data.nations[i];
        var cities = country.cities;

        for(var j = 0; j < cities.length; j ++)
        {
          var current_city = cities[j];
          if(current_city.name == cityName)
          {
            return [country, current_city];
          }
        }
      }
    }

    var findCitiesByNationID = function(nationID){
      console.log(nationID);
      for( var i=0, l=$scope.data.nations.length; i<l; i++ ) {
        if($scope.data.nations[i].id==nationID){
          $scope.data.cities = $scope.data.nations[i].cities;
          break;
        }
      }
    }

    $scope.changeCitiesOption = function(nationID)
    {
      findCitiesByNationID(nationID);
    }
  })
  .error(function(response) {
    // Current user not logged in, redirect to login
    // Error
    $scope.alertClass = "alert-danger";
    $scope.alertMessage = "You are not logged in. Please log in and try again.";

    console.log(response);

    $timeout(function() {
     $scope.changeView('/');
    }, 3000);
  });


  $scope.changeView = function(url)
  {
    $location.path(url);
  }

  $scope.loadPosts = function()
  {
    var postsURL = BACKEND_URL + 'list_post/' + $scope.data.current_user_id.toString();
    $http({
      method: 'POST',
      url: postsURL,
      headers: {
        'Authorization': $cookies.get("Travbook_auth_token")
      },
      //data: { "page": 0 }
    }).then(function successCallback(response) {
      $scope.news = response.data;
      console.log(response);
    }, function errorCallback(response) {
      console.log(response);
    });
  }

  $scope.postStatus = function(status)
  {
    postsURL = BACKEND_URL + 'new_post/';
    $http({
      method: 'POST',
      url: postsURL,
      headers: {
        'Authorization': $cookies.get("Travbook_auth_token")
      },
      data: { "content": status }
    }).then(function successCallback(response) {
      $scope.alertClass = "alert-success";
      $scope.alertMessage = "Successfully posted!";

      // Reset new status
      $scope.newStatus = "";
      $scope.loadPosts();

      console.log(response);
    }, function errorCallback(response) {
      $scope.alertClass = "alert-danger";
      $scope.alertMessage = "Could not post a new status. Please try again later.";
      console.log(response);
    });
  }

  $scope.postReply = function(reply, post_id)
  {
    replyURL = BACKEND_URL + 'reply/' + post_id.toString();
    $http({
      method: 'POST',
      url: replyURL,
      headers: {
        'Authorization': $cookies.get("Travbook_auth_token")
      },
      data: { "content": reply, "reply_to": $scope.data.current_user_id }
    }).then(function successCallback(response) {
      $scope.alertClass = "alert-success";
      $scope.alertMessage = "Successfully posted comment!";

      // Reset new status
      $scope.newComment = "";

      $scope.loadPosts();

      console.log(response);
    }, function errorCallback(response) {
      $scope.alertClass = "alert-danger";
      $scope.alertMessage = "Could not post a new status. Please try again later.";
      console.log(response);
    });
  }

  $scope.likePost = function(post)
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

  $scope.postLiked = function(post)
  {
    return post.likers.indexOf($scope.data.current_user_id) > -1;
  }

  $scope.postLikedStyle = function(post)
  {
    if($scope.postLiked(post))
    {
      return {"color": "blue"};
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

  $scope.deleteComment = function(comment)
  {
    // TODO: Show alert on success/failure
    deletePostURL = BACKEND_URL + 'delete_reply/' + comment.id.toString();
    $http({
      method: 'POST',
      url: deletePostURL,
      headers: {
        'Authorization': $cookies.get("Travbook_auth_token")
      }
    }).then(function successCallback(response) {
      $scope.alertClass = "alert-success";
      $scope.alertMessage = "Successfully deleted comment!";

      $scope.loadPosts();
      console.log(response);
    }, function errorCallback(response) {
      $scope.alertClass = "alert-danger";
      $scope.alertMessage = "Could not delete comment. Please try again later.";
      console.log(response);
    });
  }

  $scope.viewProfile = function(profile_id)
  {
    $scope.changeView("profile/" + profile_id);
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
});

var compareTo = function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compare-to"
        },
        link: function(scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
};

app.directive("compare-to", compareTo);

// Filter that capitalizes the first letter of a word
app.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});
