app.controller("ProfileController", ["$scope", "$http", "profile", "$routeParams",
  function($scope, $http, profile, $routeParams) {
    profile.success(function(data)
    {
      // TODO: Display profile - name, photo, etc, load into variables
      $scope.user = data;

      // Move load of data here
    });

    profile.error(function(data)
    {
      // Display error
    });

    $scope.data = {};

    // TODO: Load from backend instead of this
    $scope.user = {name: "Pls", profilePic: "http://lorempixel.com/200/200/", email: "test@email.com", password: "", passwordConfirmation: "", 
                    nationResidenceId: 0, willingToHost: true, nationsToGo: [1, 2], hobbies: [1]};

    var nationURL = BACKEND_URL + "countries";
    $http.get(nationURL).success(function (data){
      $scope.data.nations = data;

      $scope.user.nationResidence = data[$scope.user.nationResidenceId];
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
}]);
