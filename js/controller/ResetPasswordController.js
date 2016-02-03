app.controller("ResetPasswordController",
  function($rootScope, $scope, $location, $http) {

    $rootScope.showNav = true;
    updateURL = BACKEND_URL + 'update';
    console.log($location.search().token)
    $scope.resetPassword = function(userDetails){
      console.log(userDetails)
      $http({
        method: 'POST',
        url: updateURL,
        headers: {
          'Authorization': $location.search().token
        },
        data:userDetails
      }).then(function successCallback(response) {
        console.log(response);
        $scope.alertClass = "alert-success";
        $scope.alertMessage = "Your password is reset!";
      }, function errorCallback(response) {
        console.log(response);
        $scope.alertClass = "alert-danger";
        $scope.alertMessage = "Back off hacker";
      });
    }



});
