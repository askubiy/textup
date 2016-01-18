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
            // calendarEvents.getAll();
            return calendarEvents.getAll();
          }],
          /* calendarEventsPromise: ['calendarEvents', function($q, calendarEvents) {
            //var deferred = $q.defer();
            //console.log(calendarEvents.getAll());
            return calendarEvents.getAll();
          }], */
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