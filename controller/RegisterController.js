app.controller("registerCtrl",function($scope)
{
  $scope.registerUser = function(userDetails) {
    $scope.message = userDetails.name + userDetails.email+userDetails.agreed;
  }
  $scope.message = "Ready";
});
