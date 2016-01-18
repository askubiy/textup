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
          calendarEventsPromise: ['calendarEvents', function(calendarEvents) {
            return calendarEvents.getAll();
          }]
        }
      });
  }
]);