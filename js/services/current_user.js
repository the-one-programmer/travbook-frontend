app.factory('current_user', ['$http', '$cookies', function($http, $cookies)
{
	// Determines if current user is logged in
	// Get user auth token to determine if he can edit
	var currentUserURL = BACKEND_URL + 'current_user';
	console.log(sessionStorage.getItem("auth_token"));

	return $http({
	  method: 'GET',
	  url: currentUserURL,
	  headers: {
	    'Authorization': $cookies.get("Travbook_auth_token")//sessionStorage.getItem("auth_token")
	  },
	})
	.success(function(response) {
		alert($cookies.get("Travbook_auth_token"));
	  return response.data;
	})
	.error(function(response) {
	  console.log(response);
	  //TODO if the profile is not found, redirect to error page
	  return response;
	});
}]);

