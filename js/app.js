var app = angular.module("TravBook", ["ngRoute"]);

app.config(function ($routeProvider)
{
  $routeProvider
  .when('/', {
    controller: "LoginController",
    templateUrl: "login.html"
  })
  .when('/register', {
    controller: "RegisterController",
    templateUrl: "register.html"
  })
  .when('/profile/:id', {
    controller: "ProfileController",
    templateUrl: "profile.html"
  })
  .otherwise({
    redirectTo: '/'
  });
});