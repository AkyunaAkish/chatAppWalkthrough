app.config(function($routeProvider, $locationProvider){
  $routeProvider
  .when('/', {
    templateUrl: '/partials/landing.html',
    controller: 'MainController'
  })
  .when('/chat', {
    templateUrl: '/partials/chat.html',
    controller: 'MainController'
  })
  .otherwise({redirectTo:'/'});
  $locationProvider.html5Mode(true);

})
