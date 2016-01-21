app.controller("ProfileController", ['$scope', 'profile', "$routeParams",
  function($scope, profile, $routeParams) {
    profile.success(function(data)
    {
      // Display profile - name, photo, etc
      $scope.user = data;
    });

    profile.error(function(data)
    {
      // Display error
    });

    $scope.username = $routeParams.id;
}]);
