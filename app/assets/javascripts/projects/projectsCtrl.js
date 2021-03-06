angular.module('textUp')
.controller('ProjectsCtrl', [
  '$scope',
  '$state',
  '$translate',
  'Project',
  'Task',
  'projects',
  'notifications',

  function($scope, $state, $translate, Project, Task, projects, notifications){
    $scope.projects = projects.projects;
    $scope.project = projects.project;
    $scope.customers = projects.customers;
    $scope.customer = projects.customer;
    $scope.customerId = undefined;
    $scope.user = projects.user;
    $scope.newProjectTitle = '';
    $scope.newProjectDescription = '';
    $scope.sortType = 'title';
    $scope.sortReverse = false;

    $scope.taskSortType = 'title';
    $scope.taskSortReverse = false;

    $scope.rowClick = function(state, options){
      $state.go(state, options);
    };

    $scope.destroyProject = function(project, redirectState) {
      $translate(['confirm_delete', 'project', 'deleted_success']).then(
        function(translations){
          if (confirm(translations.confirm_delete)) {
            Project.remove({user_id: $scope.user.id, id: project.id}, function() {
              $scope.projects.splice($scope.projects.indexOf(project), 1);
              var message = translations.project + " '" +
                project.title + "' " + translations.deleted_success;
              notifications.addNotification(message, "success");
              if (redirectState) {
                $state.go(redirectState);
              };
            });
          };
        }
      );
    };

    $scope.addProject = function() {
      if(!$scope.newProjectTitle || $scope.newProjectTitle === ''
        || !$scope.customer) {
        return;
      };

      var project = new Project({
        user_id: $scope.user.id,
        customer_id: $scope.customer.id,
        title: $scope.newProjectTitle,
        description: $scope.newProjectDescription
      });
      project.$save().then(function(project){
        $translate(['project', 'added_success']).then(
          function(translations){
            var message = translations.project + " '" +
              project.title + "' " + translations.added_success;
            notifications.addNotification(message, "success");
          }
        );
        $state.go('projects');
      });
    };

    $scope.destroyTask = function(task, redirectState) {
      $translate(['confirm_delete', 'task', 'deleted_success']).then(
        function(translations){
          if (confirm(translations.confirm_delete)) {
            Task.remove({user_id: $scope.user.id, id: task.id}, function() {
              $scope.project.tasks.splice($scope.project.tasks.indexOf(task), 1);
              var message = translations.task + " '" + task.title +
                "' " + translations.deleted_success;
              notifications.addNotification(message, "success");
            });
          };
        }
      );
      if (redirectState) {
        $state.go(redirectState);
      };
    };

    $scope.updateProject = function() {
      if(!$scope.project.title || $scope.project.title === ''
        || !$scope.project.customer) {
        return;
      };
      $scope.project.customer_id = $scope.project.customer.id;
      Project.update({ id: $scope.project.id }, $scope.project)
        .$promise.then(
          function(project){
            $translate(['project', 'updated_success']).then(
              function(translations){
                var message = translations.project + " '" +
                  project.title + "' " + translations.updated_success;
                notifications.addNotification(message, "success");
              }
            );
            $state.go('show_project', { project_id: project.id });
          }
        );
    };

  }
])