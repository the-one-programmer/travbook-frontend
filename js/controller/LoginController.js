app.controller("LoginController", ['$scope',
  function($scope)
{
  $scope.loginUser = function(user) {
    console.log(user);
  }
  $scope.message = "Ready";
}]);
