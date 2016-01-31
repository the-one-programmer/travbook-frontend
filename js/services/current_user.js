app.factory('current_user', ['$http', function($http)
{
	// Determines if current user is logged in
	// Get user auth token to determine if he can edit
	var currentUserURL = BACKEND_URL + 'current_user';
	console.log(sessionStorage.getItem("auth_token"));

	return $http({
	  method: 'GET',
	  url: currentUserURL,
	  headers: {
	    'Authorization': sessionStorage.getItem("auth_token")
	  },
	})
	.success(function(response) {
	  return response.data;
	})
	.error(function(response) {
	  console.log(response);
	  //TODO if the profile is not found, redirect to error page
	  return response;
	});
}]);

