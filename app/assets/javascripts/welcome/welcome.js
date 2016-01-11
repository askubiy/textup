angular.module('textUp.welcome', ['ui.router']).

config([
  '$stateProvider',
  function config($stateProvider) {
    $stateProvider
      .state('welcome', {
        url: '/welcome',
        templateUrl: 'welcome/_welcome.html',
        controller: 'WelcomeCtrl'
      });
  }
]);