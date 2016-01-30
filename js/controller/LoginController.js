app.controller("LoginController",
  function($scope,$http, $location)
{

  $scope.loginUser = function(userDetails) {
    var loginURL = BACKEND_URL + "login"
    $http.post(loginURL,userDetails).success(function(data){
      console.log(data);
      sessionStorage.setItem("auth_token",data.auth_token);
      alert("Welcome!");

      $scope.alertClass = "alert-success";
      $scope.alertMessage = "Woohoo! Redirecting..";

      //TODO redirect to profile
      //$scope.changeView('/profile/' + user_id)
    }).error(function(error){
      console.log("error")
      console.log(error);

      // Show error message
      $scope.alertClass = "alert-danger";
      $scope.alertMessage = "There was an error logging you in. Please try again later.";
    });
  }

  $scope.message = "Ready";
  $scope.quote = {text: "Blah blah blah", author: "Ma Tanghao"};

  $scope.changeView = function(url)
  {
    $location.path(url);
  }
});

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
