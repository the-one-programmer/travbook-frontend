app.controller("SearchController",
  function($scope, $rootScope, $http, $location, $routeParams, $timeout, current_user,$cookies) {

  $scope.profilePic="http://lorempixel.com/200/200/";

  $scope.data = {};
  $scope.currentTab = 0;

  $rootScope.showNav = true;
  $rootScope.title = "Search";
  $rootScope.htmlClass = "st-layout ls-top-navbar ls-bottom-footer show-sidebar sidebar-l2";
  $rootScope.bodyClass = "";

  $scope.allDim = false;

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

    // TODO: Load search results for query
    $scope.searchQuery = $routeParams.query;
    //$rootScope.searchQuery = $routeParams.query;

    // Get data of the profile currently being viewed
    searchURL = BACKEND_URL + 'search/';
    $http({
      method: 'POST',
      url: searchURL,
      headers: {
        'Authorization': $cookies.get("Travbook_auth_token")
      },
      data: { "query": $routeParams.query }
    }).then(function successCallback(response) {
      console.log(response);
      $scope.searchResults = response.data.users;
      //$scope.searchResults.push({id: 1, name: "Test"});
      //$scope.searchResults.push({id: 3, name: "Test2"});
      console.log($scope.searchResults);
    }, function errorCallback(response) {
      console.log(response);
      // Error
      $scope.alertClass = "alert-danger";
      $scope.alertMessage = "There was an error. Please try again.";
    });
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

  $scope.search = function(search_query)
  {
    $scope.changeView("search/" + search_query);
  }

  $scope.viewProfile = function(profile_id)
  {
    $scope.changeView("profile/" + profile_id);
  }

  $scope.changeView = function(url)
  {
    $location.path(url);
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
