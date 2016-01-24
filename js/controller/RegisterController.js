app.controller("RegisterController",
  function($scope,$http)
{
  $scope.nationSelection = [];
  $scope.registerUser = function(newUser) {
    $scope.message = newUser.name + newUser.email+newUser.agreed;
    console.log(newUser);
  }

  $scope.data={};

  var nationURL = BACKEND_URL + "countries";
  $http.get(nationURL).success(function (data){
    $scope.data.nations = data;
  }).error(function(error){
    $scope.data.error = error;
  })

  $scope.message = "Ready";

});

var compareTo = function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compare-to"
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

app.directive("compare-to", compareTo);
