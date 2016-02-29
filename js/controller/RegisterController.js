app.controller("RegisterController",
  function($scope, $rootScope, $http, $location, $cookies, current_user)
{
  $rootScope.showNav = false;
  $rootScope.htmlClass = "st-layout ls-top-navbar ls-bottom-footer show-sidebar sidebar-l2";

  userURL = BACKEND_URL + 'current_user';
  $http({
    method: 'GET',
    url: userURL,
    headers: {
      'Authorization': $cookies.get("Travbook_auth_token")
    },
  }).then(function successCallback(response) {
    console.log(response);

    if(response.data.id)
    {
      // User logged in
      $scope.changeView('/news');
    }
    else
    {
      // Error
    }
  }, function errorCallback(response) {
    console.log(response);
    // Error
  });
  
  $scope.registerUser = function(newUser)
  {
    // newUser: name, email, password, nationResidence, city_id, gender, willingToHost, agreed, 
    var registerURL = BACKEND_URL + "register"
    $scope.message = newUser.name + newUser.email+newUser.agreed;
    console.log(newUser);

    // Register user
    $http.post(registerURL,newUser).success(function(data){
      console.log("success")
      console.log(data);

      $scope.alertClass = "alert-success";
      $scope.alertMessage = "Woohoo! Redirecting..";
      
      // Redirect to profile
      $scope.changeView('/edit');

    }).error(function(error)
    {
      // Show error message
      $scope.alertClass = "alert-danger";
      $scope.alertMessage = "There was an error submitting your form. Please try again later.";

      console.log(error);
    });
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

  $scope.changeView = function(url)
  {
      $location.path(url);
  }
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
