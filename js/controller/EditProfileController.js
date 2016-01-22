app.controller("EditProfileController", ['$scope', 'profile', /*"$routeParams",*/
  function($scope, profile/*, $routeParams*/) {
    profile.success(function(data)
    {
      // TODO: Display profile - name, photo, etc, load into variables
      $scope.user = data;

      $scope.username = "Hello";
      $scope.nationSelection = [];
      $scope.hobbySelection = [];
    });

    // TODO: Remove and load from http request
    $scope.username = "Hello";
    $scope.nationSelection = [];
    $scope.hobbySelection = [];

    $scope.data={
      nations: [
        {id: 1, name: 'China'},
        {id: 2, name: 'Singapore'},
        {id: 3, name: 'Taiwan'}
      ],
      hobbies: [
        {id: 1, name: 'video games'},
        {id: 2, name: 'anime'},
        {id: 3, name: 'machine learning'}
      ]
    };

    // TODO: Load from backend instead of this
    $scope.user = {name: "Pls", email: "test@email.com", password: "", passwordConfirmation: "", nationResidenceIndex: 1,
                    willingToHost: true, nationsToGo: [1, 3], hobbies: [1, 3]};
    $scope.user.nationResidence = $scope.data.nations[$scope.user.nationResidenceIndex];
    $scope.nationSelection = $scope.user.nationsToGo;
    $scope.hobbySelection = $scope.user.hobbies;

    profile.error(function(data)
    {
      // Display error
    });

    $scope.updateProfile = function(user)
    {
      // TODO: Update user details
      // user.name, user.email, user.password, user.passwordConfirmation, user.nationResidence, user.willingToHost, user.agreed

      $scope.message = user.name + user.email+user.agreed;
      user.nationsToGo = $scope.nationSelection;
      user.hobbies = $scope.hobbySelection;
    }

    $scope.toggleNationSelection = function toggleSelection(nationID)
    {
      var idx = $scope.nationSelection.indexOf(nationID);
      if (idx > -1)
      {
        $scope.nationSelection.splice(idx, 1);
      }
      else
      {
        $scope.nationSelection.push(nationID);
      }

      console.log($scope.nationSelection);
    };

    $scope.toggleHobbySelection = function toggleHobbySelection(hobbyID)
    {
      var idx = $scope.hobbySelection.indexOf(hobbyID);
      if (idx > -1)
      {
        $scope.hobbySelection.splice(idx, 1);
      }
      else
      {
        $scope.hobbySelection.push(hobbyID);
      }
      console.log($scope.hobbySelection);
    };
}]);

