app.controller("EditProfileController", ['$scope', "$http", 'profile', "$routeParams",
  function($scope, $http, profile, $routeParams) {
    profile.success(function(data)
    {
      // TODO: Display profile - name, photo, etc, load into variables
      $scope.user = data;

      // Move load of data here
    });

    profile.error(function(data)
    {
      // Display error
    });

    $scope.changeCitiesOption = function(item) {
      findCitiesByNationID(item);
    }
    
    $scope.data={};

    var currentUserURL = BACKEND_URL + 'current_user';
    console.log(sessionStorage.getItem("auth_token"));
    $http({
      method: 'GET',
      url: currentUserURL,
      headers: {
        'Authorization': sessionStorage.getItem("auth_token")
      },
    }).then(function successCallback(response) {
      $scope.data.current_user_id = response.data.id;
      // TODO: Set $scope.data to user data
    }, function errorCallback(response) {
      console.log(response);
      //TODO
    });

    var nationURL = BACKEND_URL + "countries";
    $http.get(nationURL).success(function (data){
      $scope.data.nations = data;
      $scope.data.cities = $scope.data.nations[$scope.user.nationResidence - 1].cities;
    }).error(function(error){
      $scope.data.error = error;
    });

    var hobbyURL = BACKEND_URL + "interests";
    $http.get(hobbyURL).success(function (data){
      $scope.data.hobbies = data;
    }).error(function(error){
      $scope.data.error = error;
    });

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
    // TODO: Load from backend instead of this
    $scope.user = {name: "Pls", gender: "male", profilePic: "http://lorempixel.com/200/200/", email: "test@email.com", password: "", passwordConfirmation: "", 
                    nationResidence: 2, city_id: 3, willingToHost: true, nationsToGo: [false, true], hobbies: [false, true, true, false]};
    //$scope.changeCitiesOption(0);

    $scope.updateProfile = function(user)
    {
      // TODO: Update user details
      // user.name, user.email, user.password, user.passwordConfirmation, user.nationResidence, user.willingToHost, user.agreed

      // newUser: name, email, password, nationResidence, city_id, gender, willingToHost, agreed, 

      // TODO: Change
      var updateURL = BACKEND_URL + "update"
      $scope.message = user.name + user.email+user.agreed;
      console.log(user);

      // Register user
      $http.post(updateURL,user).success(function(data){
        console.log("success")
        console.log(data);

        $scope.alertClass = "alert-success";
        $scope.alertMessage = "Woohoo! Redirecting..";
        
        //TODO redirect to profile

      }).error(function(error)
      {
        // Show error message
        $scope.alertClass = "alert-danger";
        $scope.alertMessage = "There was an error submitting your form. Please try again later.";

        console.log(error);
      });
    }


}]);

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

