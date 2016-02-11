app.controller("SearchController",
  function($scope, $rootScope, $http, $location, $routeParams, $timeout, current_user,$cookies) {

  $scope.profilePic="http://lorempixel.com/200/200/";

  $scope.data = {};
  $scope.currentTab = 0;

  $rootScope.showNav = true;
  $rootScope.title = "Search";

  var currentUserURL = BACKEND_URL + 'current_user';

$http({
    method: 'GET',
    url: currentUserURL,
    headers: {
      'Authorization': $cookies.get("Travbook_auth_token")//sessionStorage.getItem("auth_token")
    }
  })
  .success(function(data) {
        // Move load of data here
    // Current user ID - only if user is logged in
    $scope.data.current_user_id = data.id;

    // TODO: Get array of all users

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

      // TODO: Load search results for query
      $scope.searchQuery = $routeParams.query;
      $scope.searchResults = [$scope.user];

      $rootScope.username = $scope.user.name;

      $scope.countrySelection = response.data.countries_want_to_go;
      $scope.hobbySelection = response.data.interests;
      $scope.languageSelection = response.data.languages;
      console.log(response.data.countries_want_to_go);

      // TODO: Load from backend
      $scope.news = ["Blah blah blah 1", "Blah blah blah 2", "Blah blah blah 3", "Blah blah blah 4"];

      var nationURL = BACKEND_URL + "countries";
      $http.get(nationURL).success(function (data){
        $scope.data.nations = data;
      //    $scope.data.cities = $scope.data.nations[$scope.user.nationResidence - 1].cities;

          var countryData = getCountryForCityName($scope.user.city);
          $scope.countryResidence = countryData[0].id;
          $scope.cityResidence = countryData[1];
          $scope.changeCitiesOption($scope.countryResidence);
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
  })
  .error(function(response) {
    // Current user not logged in, redirect to login
    // Error
    $scope.alertClass = "alert-danger";
    $scope.alertMessage = "You are not logged in. Please log in and try again.";

    console.log(response);

    $timeout(function() {
     $scope.changeView('/');
    }, 3000);
  });

  $scope.search = function(search_query)
  {
    $scope.changeView("search/" + search_query)
  }

  $scope.changeView = function(url)
  {
    $location.path(url);
  }

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
