var app = angular.module('spaApp', ['ngRoute'])
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider
        .when('/home', {
          //templateURL
          template: "<h1>This is Home Page</h1>"
        })
        .when('/contact', {
          //templateURL
          templateUrl: 'contact1.html',
          controller: 'ContactController'
        })
        .when('/contact/:userId', {
            // $routeParams
            template: "<h3>test:{{userId}}</h3><button ng-click='reloadRoute()'>reloadRoute</button>",
            templateUrl: 'contact-detail.html',
            controller: 'ContactDetailController'
          })
        .when('/about', {
          templateUrl: 'about1.html',
          controller: 'AboutCtrl',
          //use controler alias
          controllerAs: 'about'
        })
        .otherwise({
          redirectTo: '/home'
        });
    }
  ])
  app.controller('HomeController', function($scope) {
    $scope.flash = 'This is Home Page';
  })
  .controller('ContactController', function($scope) {
    $scope.flash = 'This thi Contact';
    $scope.users = [
      { id: '1', name: 'User1'},
      { id: '2', name: 'User2'},
      { id: '3', name: 'User3'}
    ];
  })
  .controller('ContactDetailController', ['$scope', '$routeParams',
    function($scope, $routeParams) {
      $scope.userId = $routeParams.userId;

      $scope.reloadRoute = function(){
        $route.updateParams({userId: 4});
      }
    }
  ])
  .controller("AboutController", function(){
    this.flash = "This is About Page"
  })
  .controller('AppController', ['$scope', '$route', function ($scope, $route) {
    $scope.reloadRoute = function () {
      $route.reload();
    };
  }]);
  