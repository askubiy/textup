angular.module('textUp.tasks', ['ui.router']).

config([
  '$stateProvider',

  function config($stateProvider) {
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

      .state('show_task', {
        url: '/tasks/:task_id/show',
        templateUrl: 'tasks/_show.html',
        controller: 'TasksCtrl',

        resolve: {
          tasks: ['$state', 'Auth', 'Task', '$stateParams',
            function($state, Auth, Task, $stateParams){
              return Auth.currentUser().then(
                function(user){
                  return {
                    tasks: Task.query({user_id: user.id}),
                    task: Task.get({user_id: user.id, id: $stateParams.task_id}),
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

      .state('edit_task', {
        url: '/tasks/:task_id/edit',
        templateUrl: 'tasks/_edit.html',
        controller: 'TasksCtrl',

        resolve: {
          tasks: ['$state', 'Auth', 'Task', '$stateParams', 'Project',
            function($state, Auth, Task, $stateParams, Project){
              return Auth.currentUser().then(
                function(user){
                  return {
                    task: Task.get({user_id: user.id, id: $stateParams.task_id}),
                    projects: Project.query({user_id: user.id}),
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

      .state('new_task', {
        url: '/tasks/new',
        templateUrl: 'tasks/_new.html',
        controller: 'TasksCtrl',

        resolve: {
          tasks: ['$state', 'Auth', 'Task', 'Project',
            function($state, Auth, Task, Project){
              return Auth.currentUser().then(
                function(user){
                  return {
                    tasks: Task.query({user_id: user.id}),
                    projects: Project.query({user_id: user.id}),
                    user: user
                  }
                },
                function(error){
                  $state.go('welcome');
                });
            }
          ]
        }
      });
  }
]);