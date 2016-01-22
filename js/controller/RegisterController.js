app.controller("RegisterController", ['$scope',
  function($scope)
{
  $scope.nationSelection = [];
  $scope.hobbySelection = [];
  $scope.registerUser = function(newUser) {
    $scope.message = newUser.name + newUser.email+newUser.agreed;
    newUser.nationsToGo = $scope.nationSelection;
    newUser.hobbies = $scope.hobbySelection;
    console.log(newUser);
  }
  $scope.data={
    nations: [
      {id: 1, name: 'China'},
      {id: 2, name: 'Singapore'},
      {id: 3, name: 'Taiwan'}
    ],
    hobbies: [
      {id: 1, name: 'porn'},
      {id: 2, name: 'anime'},
      {id: 3, name: 'anime porn'}
    ]
  };

  $scope.toggleNationSelection = function toggleSelection(nationID) {
      var idx = $scope.nationSelection.indexOf(nationID);
      if (idx > -1) {
        $scope.nationSelection.splice(idx, 1);
      }
      else {
        $scope.nationSelection.push(nationID);
      }
      console.log($scope.nationSelection);
  };
  $scope.toggleHobbySelection = function toggleHobbySelection(hobbyID) {
      var idx = $scope.hobbySelection.indexOf(hobbyID);
      if (idx > -1) {
        $scope.hobbySelection.splice(idx, 1);
      }
      else {
        $scope.hobbySelection.push(hobbyID);
      }
      console.log($scope.hobbySelection);
  };
  $scope.message = "Ready";

}]);

var compareTo = function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
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

app.directive("compareTo", compareTo);
