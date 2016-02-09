app.controller("ProfileController",
  function($rootScope, $scope, $location, $http, $routeParams, current_user,$cookies) {
    // Initialize variables

    //$scope.profilePic="http://lorempixel.com/200/200/";

    $scope.data = {};
    $scope.currentTab = 0;

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

    $scope.changeView = function(url)
    {
        $location.path(url);
    }
});

// Filter that capitalizes the first letter of a word
app.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});
