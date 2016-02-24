app.controller("ComingSoonController",
  function($scope, $rootScope, $http, $location, $timeout, current_user, $cookies)
{
  $rootScope.showNav = false;

  $scope.message = "Ready";

  $scope.changeView = function(url)
  {
    $location.path(url);
  }
});
