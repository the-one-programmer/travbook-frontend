app.controller("registerCtrl",function($scope)
{
  $scope.registerUser = function(newUser) {
    $scope.message = newUser.name + newUser.email+newUser.agreed;
    console.log(newUser.nationResidence);
  }
  $scope.data={
    nations: [
      {id: '1', name: 'China'},
      {id: '2', name: 'Singapore'},
      {id: '3', name: 'Taiwan'}
    ]};
  $scope.message = "Ready";
});
