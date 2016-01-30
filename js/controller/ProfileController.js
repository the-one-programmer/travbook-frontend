app.controller("ProfileController", ["$scope", "$location", "$http", "$routeParams",
  function($scope, $location, $http, $routeParams) {
    // Get data of the profile currently being viewed
    profileURL = BACKEND_URL + 'show/' + $routeParams.id;
    $http({
      method: 'GET',
      url: profileURL,
      headers: {
        'Authorization': sessionStorage.getItem("auth_token")
      },
    }).then(function successCallback(response) {
      $scope.user = response.data;
      console.log($scope.user);
    }, function errorCallback(response) {
      console.log(response);
      //TODO
    });

    $scope.profilePic="http://lorempixel.com/200/200/";

    $scope.data = {};

    // Get user auth token to determine if he can edit
    var currentUserURL = BACKEND_URL + 'current_user';
    console.log(sessionStorage.getItem("auth_token"));

    $http({
      method: 'GET',
      url: currentUserURL,
      headers: {
        'Authorization': sessionStorage.getItem("auth_token")
      },
    }).then(function successCallback(response) {
      $scope.data.current_user_id = response.data.id;
    }, function errorCallback(response) {
      console.log(response);
      // Current user not logged in, redirect to login
      $scope.changeView('/');
    });

    if ($routeParams.id.to_i == $scope.data.current_user_id){
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

    $scope.wantsToGo = function(nation)
    {
      return $scope.user.nationsToGo.indexOf(nation.id) > -1
    }

    $scope.hasHobby = function(hobby)
    {
      return $scope.user.hobbies.indexOf(hobby.id) > -1
    }

    $scope.editProfile = function()
    {
      // User is viewing his own profile page
      if($routeParams.id == $scope.data.current_user_id)
      {
        // Redirect to editing page
        $scope.changeView('/edit/' + $scope.data.current_user_id);
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
}]);
