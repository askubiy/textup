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
    $scope.projects = tasks.projects;
    $scope.project = tasks.project;
    $scope.statuses = tasks.statuses;
    $scope.user = tasks.user;

    if (tasks.statuses) {
      tasks.statuses.$promise.then(function(statuses) {
        $scope.status = statuses[0]
      });
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
        project_id: $scope.project.id,
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
      $scope.task.project_id = $scope.task.project.id;
      $scope.task.status_id = $scope.task.status.id;
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