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
          projects: ['$state', 'Auth', 'Project',
            function($state, Auth, Project){
              return Auth.currentUser().then(
                function(user){
                  return {
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

      .state('new_project', {
        url: '/projects/new',
        templateUrl: 'projects/_new.html',
        controller: 'ProjectsCtrl',

        resolve: {
          projects: ['$state', 'Auth', 'Project', 'Customer',
            function($state, Auth, Project, Customer){
              return Auth.currentUser().then(
                function(user){
                  return {
                    projects: Project.query({user_id: user.id}),
                    customers: Customer.query({user_id: user.id}),
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

      .state('show_project', {
        url: '/projects/:project_id/show',
        templateUrl: 'projects/_show.html',
        controller: 'ProjectsCtrl',

        resolve: {
          projects: ['$state', 'Auth', 'Project', '$stateParams',
            function($state, Auth, Project, $stateParams){
              return Auth.currentUser().then(
                function(user){
                  return {
                    projects: Project.query({user_id: user.id}),
                    project: Project.get({user_id: user.id, id: $stateParams.project_id}),
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

      .state('new_project_task', {
        url: '/projects/:project_id/tasks/new',
        templateUrl: 'tasks/_project_new.html',
        controller: 'TasksCtrl',

        resolve: {
          tasks: ['$state', 'Auth', 'Project', '$stateParams',
            function($state, Auth, Project, $stateParams){
              return Auth.currentUser().then(
                function(user){
                  return {
                    project: Project.get({user_id: user.id, id: $stateParams.project_id}),
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

      .state('edit_project', {
        url: '/projects/:project_id/edit',
        templateUrl: 'projects/_edit.html',
        controller: 'ProjectsCtrl',

        resolve: {
          projects: ['$state', 'Auth', 'Project', '$stateParams', 'Customer',
            function($state, Auth, Project, $stateParams, Customer){
              return Auth.currentUser().then(
                function(user){
                  return {
                    project: Project.get({user_id: user.id, id: $stateParams.project_id}),
                    customers: Customer.query({user_id: user.id})
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