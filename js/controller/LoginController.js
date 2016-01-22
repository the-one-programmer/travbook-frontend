app.controller("LoginController", ['$scope',
  function($scope)
{
  $scope.loginUser = function(userDetails) {
    $scope.message = userDetails.username + userDetails.password;
  }

  $scope.message = "Ready";
  $scope.quote = {text: "Blah blah blah", author: "Ma Tanghao"};
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