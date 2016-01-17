app.controller("loginCtrl",function($scope)
{
  $scope.loginUser = function(userDetails) {
    $scope.message = userDetails.name + userDetails.email+userDetails.agreed;
  }
  $scope.message = "Ready";
});
