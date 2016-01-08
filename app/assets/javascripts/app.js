angular.module('textUp', [
  'ui.router',
  'templates',
  'Devise',
  'ngResource',
  'textUp.home',
  'textUp.welcome',
  'textUp.customers',
  'textUp.projects'
])
.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('tasks', {
      url: '/tasks',
      templateUrl: 'tasks/_index.html',
      controller: 'TasksCtrl',

      resolve: {
        tasks: ['$state', 'Auth', 'Task',
          function($state, Auth, Task){
            return Auth.currentUser().then(
              function(user){
                return {
                  tasks: Task.query({user_id: user.id}),
                  user: user
                }
              },
              function(error){
                $state.go('welcome');
              });
          }
        ]
      }
    })

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
