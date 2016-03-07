var app = angular.module("TravBook", ["ngRoute","ngCookies"]);
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
  .when('/news', {
    controller: "NewsFeedController",
    templateUrl: "views/news.html"
    // css: "css/news-stylesheet.css"
  })
  .when('/search/', {
    controller: "SearchController",
    templateUrl: "views/search.html",
    css: "css/search-stylesheet.css"
  })
  .when('/search/:query', {
    controller: "SearchController",
    templateUrl: "views/search.html",
    css: "css/search-stylesheet.css"
  })
  .when('/profile/:id', {
    controller: "ProfileController",
    templateUrl: "views/profile.html"
    // css: "css/profile-stylesheet.css"
  })
  .when('/edit/', {
    controller: "EditProfileController",
    templateUrl: "views/edit.html",
    css: "css/edit-stylesheet.css"
  }).when('/forgotpassword', {
    controller: "ForgotPasswordController",
    templateUrl: "views/forgotpassword.html"
  }).when('/resetpassword', {
    controller: "ResetPasswordController",
    templateUrl: "views/resetpassword.html"
  })
  .otherwise({
    redirectTo: '/'
  });
});

// Directive for view-specific stylesheets
app.directive('head', ['$rootScope','$compile',
    function($rootScope, $compile){
        return {
            restrict: 'E',
            link: function(scope, elem){
                var html = '<link rel="stylesheet" ng-repeat="(routeCtrl, cssUrl) in routeStyles" ng-href="{{cssUrl}}" />';
                elem.append($compile(html)(scope));
                scope.routeStyles = {};
                $rootScope.$on('$routeChangeStart', function (e, next, current) {
                    if(current && current.$$route && current.$$route.css){
                        if(!angular.isArray(current.$$route.css)){
                            current.$$route.css = [current.$$route.css];
                        }
                        angular.forEach(current.$$route.css, function(sheet){
                            delete scope.routeStyles[sheet];
                        });
                    }
                    if(next && next.$$route && next.$$route.css){
                        if(!angular.isArray(next.$$route.css)){
                            next.$$route.css = [next.$$route.css];
                        }
                        angular.forEach(next.$$route.css, function(sheet){
                            scope.routeStyles[sheet] = sheet;
                        });
                    }
                });
            }
        };
    }
]);

app.directive('newsFeedItem', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      item: '='
    }, 
    templateUrl: 'js/directives/newsFeedItem.html' 
  }; 
});

app.directive('newsFeedComment', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      comment: '=' ,
      viewProfile: '&'
    }, 
    templateUrl: 'js/directives/newsFeedComment.html' 
  }; 
});
