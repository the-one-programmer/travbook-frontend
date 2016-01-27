app.controller("EditProfileController", ['$scope', "$http", 'profile', "$routeParams",
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
    $scope.user = {name: "Pls", gender: "male", profilePic: "http://lorempixel.com/200/200/", email: "test@email.com", password: "", passwordConfirmation: "", 
                    nationResidenceId: 0, willingToHost: true, nationsToGo: [1], hobbies: []};

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
    })

    $scope.updateProfile = function(user)
    {
      // TODO: Update user details
      // user.name, user.email, user.password, user.passwordConfirmation, user.nationResidence, user.willingToHost, user.agreed

      $scope.message = user.name + user.email+user.agreed;
      user.nationsToGo = $scope.nationSelection;
      user.hobbies = $scope.hobbySelection;
    }

    $scope.toggleNationSelection = function toggleSelection(nationID)
    {
      var idx = $scope.nationSelection.indexOf(nationID);
      if (idx > -1)
      {
        $scope.nationSelection.splice(idx, 1);
      }
      else
      {
        $scope.nationSelection.push(nationID);
      }

      console.log($scope.nationSelection);
    };

    $scope.toggleHobbySelection = function toggleHobbySelection(hobbyID)
    {
      var idx = $scope.hobbySelection.indexOf(hobbyID);
      if (idx > -1)
      {
        $scope.hobbySelection.splice(idx, 1);
      }
      else
      {
        $scope.hobbySelection.push(hobbyID);
      }
      console.log($scope.hobbySelection);
    };

    $scope.wantsToGo = function(nation)
    {
      return $scope.user.nationsToGo.indexOf(nation.id) > -1
    };

    $scope.hasHobby = function(hobby)
    {
      return $scope.user.hobbies.indexOf(hobby.id) > -1
    };
}]);

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

