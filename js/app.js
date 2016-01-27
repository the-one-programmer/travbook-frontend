var app = angular.module("TravBook", ["ngRoute"]);
var BACKEND_URL ="http://localhost:3000/api/";

app.config(function ($routeProvider)
{
  $routeProvider
  .when('/', {
    controller: "LoginController",
    templateUrl: "views/login.html"
  })
  .when('/register', {
    controller: "RegisterController",
    templateUrl: "views/register.html"
  })
  .when('/profile/:id', {
    controller: "ProfileController",
    templateUrl: "views/profile.html"
  })
  .when('/edit', {
    controller: "EditProfileController",
    templateUrl: "views/edit.html"
  })
  .otherwise({
    redirectTo: '/'
  });
});

app.factory("AuthService", function($http, $q, $rootScope, AuthToken, AuthEvents) {
  return {
    login: function(email, password) {
      var d = $q.defer();
      $http.post(BACKEND_URL+'login', {
        email: email,
        password: password
      }).success(function(resp) {
        console.log("success");
        AuthToken.set(resp.auth_token);
        $rootScope.$broadcast(AuthEvents.loginSuccess);
        d.resolve(resp.user);
      }).error(function(resp) {
        $rootScope.$broadcast(AuthEvents.loginFailed);
        d.reject(resp.error);
      });
      return d.promise;
    }
  };
});

app.factory("AuthInterceptor", function($q, $injector) {
  return {
    // This will be called on every outgoing http request
    request: function(config) {
      var AuthToken = $injector.get("AuthToken");
      var token = AuthToken.get();
      config.headers = config.headers || {};
      if (token) {
        config.headers.Authorization = "Bearer " + token;
      }
      return config || $q.when(config);
    },
    // This will be called on every incoming response that has en error status code
    responseError: function(response) {
      var AuthEvents = $injector.get('AuthEvents');
      var matchesAuthenticatePath = response.config && response.config.url.match(new RegExp('/api/auth'));
      if (!matchesAuthenticatePath) {
        $injector.get('$rootScope').$broadcast({
          401: AuthEvents.notAuthenticated,
          403: AuthEvents.notAuthorized,
          419: AuthEvents.sessionTimeout
        }[response.status], response);
      }
      return $q.reject(response);
    }
  };
});

app.config(function($httpProvider) {
  return $httpProvider.interceptors.push("AuthInterceptor");
});
