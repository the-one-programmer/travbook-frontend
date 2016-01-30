app.controller("ProfileController", ["$scope", "$http", "$routeParams",
  function($scope, $http, $routeParams) {
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
    $scope.data = {};
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
      // TODO: Set $scope.data to user data

    }, function errorCallback(response) {
      console.log(response);
      //TODO if the profile is not found, redirect to somewhere
    });
    if ($routeParams.id.to_i == $scope.data.current_user_id){
      $scope.isEditable = true;
    }else{
      $scope.isEditable = false;
    }

    //$scope.isEditing = false;

    // TODO: Load from backend instead of this
    //$scope.user = {name: "Pls", gender: "male", profilePic: "http://lorempixel.com/200/200/", email: "test@email.com", password: "", passwordConfirmation: "",
                //    nationResidenceId: 0, willingToHost: true, nationsToGo: [1, 2], hobbies: [1]};
    //$scope.user.quote = "Wake me up when it's time to travel and I will get up from my beer barrel";
    //$scope.user.roles = ["Accomodation", "Pick-up Services", "Private Transport", "Tour Guide Service"];
    $scope.profilePic="http://lorempixel.com/200/200/";
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

    /*
    $scope.toggleEditing = function()
    {
      // TODO: Swap profile form with editable one
      alert("Edit!");
      $scope.isEditing = !$scope.isEditing;

      if($scope.isEditing)
      {
        // Show editing form
      }
      else
      {
        // Show normal profile
      }
    }
    */

    $scope.wantsToGo = function(nation)
    {
      return $scope.user.nationsToGo.indexOf(nation.id) > -1
    }

    $scope.hasHobby = function(hobby)
    {
      return $scope.user.hobbies.indexOf(hobby.id) > -1
    }
}]);
