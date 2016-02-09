app.controller("LoginController",
  function($scope, $rootScope, $http, $location, $timeout, current_user, $cookies)
{
  $rootScope.showNav = false;

  userURL = BACKEND_URL + 'current_user';
  $http({
    method: 'GET',
    url: userURL,
    headers: {
      'Authorization': $cookies.get("Travbook_auth_token")
    },
  }).then(function successCallback(response) {
    console.log(response);

    $scope.changeView('/edit');
  }, function errorCallback(response) {
    console.log(response);
    // Error
  });

  $scope.loginUser = function(userDetails) {
    var loginURL = BACKEND_URL + "login"
    $http.post(loginURL,userDetails).success(function(data){
      console.log(data);
      sessionStorage.setItem("auth_token",data.auth_token);
      $cookies.put("Travbook_auth_token",data.auth_token);

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
      $scope.alertMessage = error.error;
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
