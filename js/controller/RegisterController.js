app.controller("RegisterController", ['$scope',
  function($scope)
{
  $scope.nationSelection = [];
  $scope.registerUser = function(newUser) {
    $scope.message = newUser.name + newUser.email+newUser.agreed;
    console.log(newUser);
  }
  $scope.data={
    nations: [
      {id: 1, name: 'China'},
      {id: 2, name: 'Singapore'},
      {id: 3, name: 'Taiwan'}
    ]
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
