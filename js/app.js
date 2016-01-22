var app = angular.module("TravBook", ["ngRoute"]);

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