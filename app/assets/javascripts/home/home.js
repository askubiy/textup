angular.module('textUp.home', ['ui.router']).

config([
  '$stateProvider',

  function config($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'home/_home.html',
        controller: 'MainCtrl',
        resolve: {
          authPromise: ['$state', 'Auth', function($state, Auth) {
            Auth.currentUser().then(
              function(){
              },
              function() {
                $state.go('welcome');
              }
            )
          }]
        }
      });
  }
]);