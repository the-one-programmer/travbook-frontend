app.controller("EditProfileController",
  function($scope, $rootScope, $http, $location, $timeout, current_user,$cookies) {

  $scope.profilePic="http://lorempixel.com/200/200/";

  $scope.data = {};
  $scope.currentTab = 0;

  $rootScope.showNav = true;
  $rootScope.title = "Edit Profile";

  current_user.success(function(data)
  {
    // Move load of data here
    // Current user ID - only if user is logged in
    $scope.data.current_user_id = data.id;
    console.log(data.id);
    // Get data of the profile currently being viewed
    profileURL = BACKEND_URL + 'show/' + $scope.data.current_user_id;
    $http({
      method: 'GET',
      url: profileURL,
      headers: {
        'Authorization': $cookies.get("Travbook_auth_token")
      },
    }).then(function successCallback(response) {
      $scope.user = response.data;
      $rootScope.username = $scope.user.name;

      var countryData = getCountryForCityName($scope.user.city);
      $scope.countryResidence = countryData[0].id;
      $scope.cityResidence = countryData[1];
      $scope.changeCitiesOption($scope.countryResidence);
      $scope.countrySelection = response.data.countries_want_to_go;
      $scope.hobbySelection = response.data.interests;
      $scope.languageSelection = response.data.languages;
      console.log(response.data.countries_want_to_go);
    }, function errorCallback(response) {
      console.log(response);
      // Error
      $scope.alertClass = "alert-danger";
      $scope.alertMessage = "There was an error. Please try again.";

      // Redirect to profile after delay
      $timeout(function() {
        $scope.changeView('/');
      }, 3000);
    });
  });

  current_user.error(function(data)
  {
    // Current user not logged in, redirect to login
    // Error
    $scope.alertClass = "alert-danger";
    $scope.alertMessage = "You are not logged in. Please log in and try again.";

    // Redirect to profile after delay
    $timeout(function() {
      $scope.changeView('/');
    }, 3000);
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

  var languagesURL = BACKEND_URL + "languages";
  $http.get(languagesURL).success(function (data){
    $scope.data.languages = data;
  }).error(function(error){
    $scope.data.error = error;
  });

  var getCountryForCityName = function(cityName)
  {
    for(var i = 0; i < $scope.data.nations.length; i++)
    {
      var country = $scope.data.nations[i];
      var cities = country.cities;

      for(var j = 0; j < cities.length; j ++)
      {
        var current_city = cities[j];
        if(current_city.name == cityName)
        {
          return [country, current_city];
        }
      }
    }
  }

  var findCitiesByNationID = function(nationID){
    console.log(nationID);
    for( var i=0, l=$scope.data.nations.length; i<l; i++ ) {
      if($scope.data.nations[i].id==nationID){
        $scope.data.cities = $scope.data.nations[i].cities;
        break;
      }
    }
  }

  $scope.changeCitiesOption = function(nationID)
  {
    findCitiesByNationID(nationID);
  }

  $scope.message = "Ready";
  // TODO: Load from backend instead of this
  //$scope.user = {name: "Pls", gender: "male", profilePic: "http://lorempixel.com/200/200/", email: "test@email.com", password: "", passwordConfirmation: "",
  //                nationResidence: 2, city_id: 3, willingToHost: true, nationsToGo: [false, true], hobbies: [false, true, true, false]};
  //$scope.changeCitiesOption(0);

  $scope.updateProfile = function(user)
  {
    // TODO: Update user details
    // user.name, user.email, user.password, user.passwordConfirmation, user.nationResidence, user.willingToHost, user.agreed

    // newUser: name, email, password, nationResidence, city_id, gender, willingToHost, agreed,

    var updateURL = BACKEND_URL + "update";
    $scope.message = user.name + user.email+user.agreed;
    // Update city
    var countryData = getCountryForCityName($scope.cityResidence.name);
    $scope.user.city_id = countryData[1].id;
    user.countries_want_to_go = $scope.countrySelection;
    user.interests = $scope.hobbySelection;
    user.languages = $scope.languageSelection;

    console.log(user);

    // Register user
    $http({
      method: 'POST',
      url: updateURL,
      headers: {
        'Authorization': $cookies.get("Travbook_auth_token")
      },
      data: user
    }).success(function(data){
      console.log("success")
      console.log(data);

      $scope.alertClass = "alert-success";
      $scope.alertMessage = "Updated your profile!";

      $timeout(function() {
        $scope.changeView('/edit');
      }, 2000);
    }).error(function(error)
    {
      // Show error message
      $scope.alertClass = "alert-danger";
      $scope.alertMessage = "There was an error submitting your form. Please try again later.";

      console.log(error);
    });
  }

  $scope.changeView = function(url)
  {
    $location.path(url);
  }

  $scope.toggleNationSelection = function toggleSelection(nationID) {
    var idx = $scope.countrySelection.indexOf(nationID);
    if (idx > -1) {
      $scope.countrySelection.splice(idx, 1);
    }
    else {
      $scope.countrySelection.push(nationID);
    }
    console.log($scope.countrySelection);
  };

  $scope.toggleHobbySelection = function toggleHobbySelection(hobbyID) {
        var idx = $scope.hobbySelection.indexOf(hobbyID);
        if (idx > -1) {
          $scope.hobbySelection.splice(idx, 1);
        }
        else {
          $scope.hobbySelection.push(hobbyID);
        }
        console.log($scope.hobbySelection);
    };

  $scope.toggleLanguageSelection = function toggleLanguageSelection(languageID) {
        var idx = $scope.languageSelection.indexOf(languageID);
        if (idx > -1) {
          $scope.languageSelection.splice(idx, 1);
        }
        else {
          $scope.languageSelection.push(languageID);
        }
        console.log($scope.languageSelection);
    };

    $scope.wantsToGo = function(nation_id)
    {
      return $scope.user.countries_want_to_go.indexOf(nation_id) > -1
    }

    $scope.hasHobby = function(hobby_id)
    {
      return $scope.user.interests.indexOf(hobby_id) > -1
    }

    $scope.hasLanguage = function(language_id)
    {
      return $scope.user.languages.indexOf(language_id) > -1
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

// Filter that capitalizes the first letter of a word
app.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});
