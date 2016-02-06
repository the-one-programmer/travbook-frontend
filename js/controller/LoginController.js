app.controller("LoginController",
  function($scope, $rootScope, $http, $location, $timeout, current_user, $cookies)
{
  $rootScope.showNav = false;

  current_user.success(function(data)
  {
    // User is already logged in, redirect
    // TODO: Change redirect to news feed
    $scope.changeView("/edit");
  });

  $scope.loginUser = function(userDetails) {
    var loginURL = BACKEND_URL + "login"
    $http.post(loginURL,userDetails).success(function(data){
      console.log(data);
      sessionStorage.setItem("auth_token",data.auth_token);
      $cookies.put("Travbook_auth_token",data.auth_token);

      alert($cookies.get("Travbook_auth_token"));
      $scope.alertClass = "alert-success";
      $scope.alertMessage = "Successfully logged you in!";

      // Redirect to profile after delay
      $timeout(function() {
        $scope.changeView('/edit');
      }, 1000);
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
