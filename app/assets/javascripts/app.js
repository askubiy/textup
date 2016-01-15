var app = angular.module('textUp', [
  'ui.router',
  'ui.bootstrap',
  'mwl.calendar',
  'templates',
  'Devise',
  'ngResource',
  'textUp.home',
  'textUp.welcome',
  'textUp.customers',
  'textUp.projects',
  'textUp.tasks',
  'textUp.contact_people'
])
.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'auth/_login.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'Auth', function($state, Auth) {
        Auth.currentUser().then(
          function(){
            $state.go('home');
          }
        )
      }]
    })

    .state('register', {
      url: '/register',
      templateUrl: 'auth/_register.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'Auth', function($state, Auth) {
        Auth.currentUser().then(function(){
          $state.go('home');
        })
      }]
    });

  $urlRouterProvider.otherwise('welcome');
}])

app.constant("moment", moment);
