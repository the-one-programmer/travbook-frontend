app.controller("LoginController",
  function($scope,$http)
{

  $scope.loginUser = function(userDetails) {
    var loginURL = BACKEND_URL + "login"
    $http.post(loginURL,userDetails).success(function(data){
      console.log("success")
      console.log(data);
      //TODO redirect to profile
    }).error(function(error){
      console.log("error")
      console.log(error);
      //TODO shows error message
    });
  }

  $scope.message = "Ready";
  $scope.quote = {text: "Blah blah blah", author: "Ma Tanghao"};
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
