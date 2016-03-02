app.controller("ForgotPasswordController",
  function($scope, $rootScope, $http, $location, $timeout, current_user)
{
  $rootScope.bodyClass = "login";
  $rootScope.htmlClass = "ls-bottom-footer";
  
  $scope.sendEmail = function(userDetails) {
    var resetURL = BACKEND_URL + "request_reset_password";
    $http.post(resetURL,userDetails).success(function(data){
      console.log(data);
      $scope.alertClass = "alert-success";
      $scope.alertMessage = "An email is sent to your Inbox!";

    }).error(function(error){
      console.log("error");
      console.log(error);
      //TODO
      //check error message
      $scope.alertClass = "alert-danger";
      $scope.alertMessage = error.message;
    });
  }
});
