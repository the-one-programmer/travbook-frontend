app.factory('logout', ["$cookies", "$timeout", "$location", function($cookies, $timeout, $location)
{
	return {
            logout: function() {
				$cookies.remove("Travbook_auth_token");

				$timeout(function() {
					$location.path('/');
				}, 0);
            }
    };
}]);

