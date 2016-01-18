app.controller("LoginController", ['$scope',
  function($scope)
{
  $scope.loginUser = function(userDetails) {
    $scope.message = userDetails.name + userDetails.email + userDetails.agreed;
  }
  $scope.message = "Ready";
}]);
