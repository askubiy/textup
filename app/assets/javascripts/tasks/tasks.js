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
          tasks: ['$state', 'Auth', 'Task', '$q',
            function($state, Auth, Task, $q){
              var deferred = $q.defer();
              Auth.currentUser().then(
                function(user){
                  Task.query({user_id: user.id}).$promise.then(
                    function(tasks){
                      deferred.resolve({
                        tasks: tasks,
                        user: user
                      });
                    }
                  )
                },
                function(error){
                  $state.go('welcome');
                }
              );

              return deferred.promise;
            }
          ]
        }
      })

      .state('show_task', {
        url: '/tasks/:task_id/show',
        templateUrl: 'tasks/_show.html',
        controller: 'TasksCtrl',

        resolve: {
          tasks: ['$state', 'Auth', 'Task', '$stateParams', '$q',
            function($state, Auth, Task, $stateParams, $q){
              var deferred = $q.defer();
              Auth.currentUser().then(
                function(user){
                  Task.query({user_id: user.id}).$promise.then(
                    function(tasks){
                      Task.get({user_id: user.id, id: $stateParams.task_id }).$promise.then(
                        function(task){
                          deferred.resolve({
                            tasks: tasks,
                            task: task,
                            user: user
                          });
                        }
                      )
                    }
                  )
                },
                function(error){
                  $state.go('welcome');
                }
              );

              return deferred.promise;
            }
          ]
        }
      })

      .state('edit_task', {
        url: '/tasks/:task_id/edit',
        templateUrl: 'tasks/_edit.html',
        controller: 'TasksCtrl',

        resolve: {
          tasks: ['$state', 'Auth', 'Task',
            '$stateParams', 'Project', 'Status', '$q',
            function($state, Auth, Task, $stateParams, Project, Status, $q){
              var deferred = $q.defer();
              Auth.currentUser().then(
                function(user){
                  Task.get({user_id: user.id, id: $stateParams.task_id}).$promise.then(
                    function(task){
                      Project.query({user_id: user.id}).$promise.then(
                        function(projects){
                          Status.query().$promise.then(
                            function(statuses){
                              deferred.resolve({
                                task: task,
                                projects: projects,
                                statuses: statuses,
                                user: user
                              });
                            }
                          );
                        }
                      );
                    }
                  );
                },
                function(error){
                  $state.go('welcome');
                }
              );

              return deferred.promise;
            }
          ]
        }
      })

      .state('new_task', {
        url: '/tasks/new',
        templateUrl: 'tasks/_new.html',
        controller: 'TasksCtrl',

        resolve: {
          tasks: ['$state', 'Auth', 'Task', 'Project', 'Status', '$q',
            function($state, Auth, Task, Project, Status, $q){
              var deferred = $q.defer();
              Auth.currentUser().then(
                function(user){
                  Task.query({user_id: user.id}).$promise.then(
                    function(tasks){
                      Project.query({user_id: user.id}).$promise.then(
                        function(projects){
                          Status.query().$promise.then(
                            function(statuses){
                              deferred.resolve({
                                tasks: tasks,
                                projects: projects,
                                statuses: statuses,
                                user: user
                              });
                            }
                          );
                        }
                      );
                    }
                  );
                },
                function(error){
                  $state.go('welcome');
                }
              );

              return deferred.promise;
            }
          ]
        }
      });
  }
]);