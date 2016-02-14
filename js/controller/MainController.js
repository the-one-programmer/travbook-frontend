app.controller("MainController",
  function($scope, $rootScope, $http, $location, $timeout, current_user, logout, $cookies)
{
	$rootScope.title = "TravBook";
  $scope.searchQuery = "";
	
  $scope.logout = function()
  {
    logout.logout();
  }

  $scope.changeView = function(url)
  {
    $location.path(url);
  }

  $scope.search = function()
  {
    $location.path("/search/" + $scope.searchQuery);
  }
});