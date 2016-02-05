angular.module('textUp.welcome', ['ui.router']).

config([
  '$stateProvider',
  function config($stateProvider) {
    $stateProvider
      .state('welcome', {
        url: '/welcome',
        templateUrl: 'welcome/_welcome.html',
        controller: 'WelcomeCtrl',
        resolve: {
          user: ['$state', 'Auth', 'Customer', '$q',
            function($state, Auth, Customer, $q){
              console.log("welcome to home");
              console.log(Auth.isAuthenticated());
              Auth.currentUser().then(
                function(user){
                  $state.go('home');
                }
              )
            }
          ]
        }
      });
  }
]);