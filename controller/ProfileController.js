app.controller("ProfileController", ['$scope', 'profile',
  function($scope, profile) {
    profile.success(function(data)
    {
      // Display profile
      $scope.user = data;
    });

    profile.error(function(data)
    {
      // Display error
    });

    $scope.username = "Lim Ah Seng";
}]);
