angular.module('textUp')
.controller('TasksCtrl', [
  '$scope',
  '$state',
  'Task',
  'tasks',
  'notifications',

  function($scope, $state, Task, tasks, notifications){
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
      if (confirm('Вы уверены что хотите удалить эту задачу?')) {
        Task.remove({user_id: $scope.user.id, id: task.id}, function() {
          $scope.tasks.splice($scope.tasks.indexOf(task), 1);
          var message = "Задача '" + task.title + "' удалёна успешно";
          notifications.addNotification(message, "success");
          if (redirectState) {
            $state.go(redirectState);
          };
        });
      };
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
        var message = "Задача '" + task.title + "' добавлена";
        notifications.addNotification(message, "success");
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
            var message = "Задача '" + task.title + "' обновлена";
            notifications.addNotification(message, "success");
            $state.go('show_task', { task_id: task.id });
          }
        );
    };

  }
])