angular.module('textUp')
.controller('TasksCtrl', [
  '$scope',
  '$state',
  '$translate',
  'Task',
  'tasks',
  'notifications',

  function($scope, $state, $translate, Task, tasks, notifications){
    $scope.tasks = tasks.tasks;
    $scope.task = tasks.task;
    $scope.customer = $scope.task ? $scope.task.customer : null;
    $scope.projects = tasks.projects;
    $scope.project = tasks.project || ($scope.task ? $scope.task.project : null);
    $scope.statuses = tasks.statuses;
    $scope.customers = tasks.customers;
    $scope.user = tasks.user;
    var allProjects = [];
    angular.copy(tasks.projects, allProjects);

    $scope.rowClick = function(task){
      $state.go("show_task", {task_id: task.id});
    };

    if (tasks.statuses) {
      tasks.statuses.$promise.then(function(statuses) {
        $scope.status = statuses[0];
      });
    };

    $scope.changeCustomer = function(customer){
      console.log("changeCustomer");
      if (customer){
        $scope.projects = customer.projects;
      } else {
        $scope.projects = allProjects;
      }
    };

    $scope.changeProject = function(project){
      if (project){
        $scope.customer = project.customer ? project.customer : $scope.customer;
      }
    };

    $scope.destroyTask = function(task, redirectState) {
      $translate(['confirm_delete', 'task', 'deleted_success']).then(
        function(translations){
          if (confirm(translations.confirm_delete)) {
            Task.remove({user_id: $scope.user.id, id: task.id}, function() {
              $scope.tasks.splice($scope.tasks.indexOf(task), 1);
              var message = translations.task + " '" +
                task.title + "' " + translations.deleted_success;
              notifications.addNotification(message, "success");
              if (redirectState) {
                $state.go(redirectState);
              };
            });
          };
        }
      );
    };

    $scope.addTask = function(redirectState) {
      if($scope.newTaskTitle === '') { return; };
      var task = new Task({
        user_id: $scope.user.id,
        project_id: ($scope.project ? $scope.project.id : null),
        customer_id: ($scope.customer ? $scope.customer.id : null),
        status_id: $scope.status.id,
        title: $scope.newTaskTitle,
        description: $scope.newTaskDescription,
        started_at: $scope.startDateTime,
        estimated_finish: $scope.estimatedFinishDateTime,
      });
      task.$save().then(function(task){
        $scope.newTaskTitle = '';
        $scope.newTaskDescription = '';
        $scope.startDateTime = undefined;
        $scope.estimatedFinishDateTime = undefined;
        $translate(['task', 'added_success']).then(
          function(translations){
            var message = translations.task + " '" +
              task.title + "' " + translations.added_success;
            notifications.addNotification(message, "success");
          }
        );
        if (redirectState) {
          $state.go(redirectState);
        } else {
          if ($scope.project) {
            $state.go('show_project', { project_id: $scope.project.id });
          } else {
            $state.go('tasks');
          };
        };
      });
    };

    $scope.updateTask = function() {
      if($scope.task.title === '') { return; };
      $scope.task.project_id = ($scope.project ? $scope.project.id : null);
      $scope.task.status_id = $scope.task.status.id;
      $scope.task.customer_id = ($scope.customer ? $scope.customer.id : null);
      Task.update({ id: $scope.task.id }, $scope.task)
        .$promise.then(
          function(task){
            $translate(['task', 'updated_success']).then(
              function(translations){
                var message = translations.task + " '" +
                  task.title + "' " + translations.updated_success;
                notifications.addNotification(message, "success");
              }
            );
            $state.go('show_task', { task_id: task.id });
          }
        );
    };

  }
])