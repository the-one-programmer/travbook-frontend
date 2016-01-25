app.controller("RegisterController",
  function($scope,$http)
{
  $scope.registerUser = function(newUser) {
    $scope.message = newUser.name + newUser.email+newUser.agreed;
    console.log(newUser);
  }
  $scope.changeCitiesOption = function(item) {
    findCitiesByNationID(item);
  }
  $scope.data={};
  var nationURL = BACKEND_URL + "countries";
  $http.get(nationURL).success(function (data){
    $scope.data.nations = data;
  }).error(function(error){
    $scope.data.error = error;
  })
  var findCitiesByNationID = function(nationID){
    console.log(nationID);
    for( var i=0, l=$scope.data.nations.length; i<l; i++ ) {
      if($scope.data.nations[i].id==nationID){
        $scope.data.cities = $scope.data.nations[i].cities;
        break;
      }
    }
  }
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
