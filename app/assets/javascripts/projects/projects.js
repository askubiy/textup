angular.module('textUp.projects', ['ui.router']).

config([
  '$stateProvider',

  function config($stateProvider) {
    $stateProvider
      .state('projects', {
        url: '/projects',
        templateUrl: 'projects/_index.html',
        controller: 'ProjectsCtrl',

        resolve: {
          projects: ['$state', 'Auth', 'Project', '$q',
            function($state, Auth, Project, $q){
              var deferred = $q.defer();
              Auth.currentUser().then(
                function(user){
                  Project.query({user_id: user.id}).$promise.then(
                    function(projects){
                      deferred.resolve({
                        projects: projects,
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

      .state('new_project', {
        url: '/projects/new',
        templateUrl: 'projects/_new.html',
        controller: 'ProjectsCtrl',

        resolve: {
          projects: ['$state', '$translate', 'notifications',
            'Auth', 'Project', 'Customer', '$q',
            function($state, $translate, notifications, Auth, Project, Customer, $q){
              var deferred = $q.defer();
              Auth.currentUser().then(
                function(user){
                  Project.query({user_id: user.id}).$promise.then(
                    function(projects) {
                      Customer.query({user_id: user.id}).$promise.then(
                        function(customers){
                          if (customers.length == 0) {
                            var message = "";
                            $translate('no_customers_project_error').then(
                              function(no_customers_project_error){
                                message = no_customers_project_error;
                                notifications.addNotification(message, "danger");
                              }
                            );
                            $state.go('projects');
                          }
                          deferred.resolve({
                            projects: projects,
                            customers: customers,
                            user: user
                          });
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

      .state('show_project', {
        url: '/projects/:project_id/show',
        templateUrl: 'projects/_show.html',
        controller: 'ProjectsCtrl',

        resolve: {
          projects: ['$state', 'Auth', 'Project', '$stateParams', '$q',
            function($state, Auth, Project, $stateParams, $q){
              var deferred = $q.defer();
              Auth.currentUser().then(
                function(user){
                  Project.query({user_id: user.id}).$promise.then(
                    function(projects) {
                      Project.get({user_id: user.id, id: $stateParams.project_id }).$promise.then(
                        function(project){
                          deferred.resolve({
                            projects: projects,
                            project: project,
                            user: user
                          });
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

      .state('new_project_task', {
        url: '/projects/:project_id/tasks/new',
        templateUrl: 'tasks/_project_new.html',
        controller: 'TasksCtrl',

        resolve: {
          tasks: ['$state', 'Auth', 'Project', '$stateParams', 'Status', '$q',
            function($state, Auth, Project, $stateParams, Status, $q){
              var deferred = $q.defer();
              Auth.currentUser().then(
                function(user){
                  Project.query({user_id: user.id}).$promise.then(
                    function(projects){
                      Project.get({user_id: user.id, id: $stateParams.project_id }).$promise.then(
                        function(project){
                          Status.query().$promise.then(
                            function(statuses){
                              deferred.resolve({
                                projects: projects,
                                project: project,
                                statuses: statuses,
                                user: user
                              });
                            }
                          )
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

      .state('edit_project', {
        url: '/projects/:project_id/edit',
        templateUrl: 'projects/_edit.html',
        controller: 'ProjectsCtrl',

        resolve: {
          projects: ['$state', 'Auth', 'Project', 'Customer', '$stateParams', '$q',
            function($state, Auth, Project, Customer, $stateParams, $q){
              var deferred = $q.defer();
              Auth.currentUser().then(
                function(user){
                  Project.get({user_id: user.id, id: $stateParams.project_id}).$promise.then(
                    function(project) {
                      Customer.query({user_id: user.id}).$promise.then(
                        function(customers){
                          deferred.resolve({
                            project: project,
                            customers: customers,
                            user: user
                          });
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