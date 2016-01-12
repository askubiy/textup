angular.module('textUp')
.controller('TasksCtrl', [
  '$scope',
  '$state',
  'Task',
  'tasks',

  function($scope, $state, Task, tasks){
    $scope.tasks = tasks.tasks;
    $scope.task = tasks.task;
    $scope.projects = tasks.projects;
    $scope.project = tasks.project;
    $scope.user = tasks.user;

    $scope.destroyTask = function(task, redirectState) {
      if (confirm('Вы уверены что хотите удалить эту задачу?')) {
        Task.remove({user_id: $scope.user.id, id: task.id}, function() {
          $scope.tasks.splice($scope.tasks.indexOf(task), 1);
        });
      };

      if (redirectState) {
        $state.go(redirectState);
      };
    };

    $scope.addTask = function() {
      if($scope.newTaskTitle === '') { return; };
      var task = new Task({
        user_id: $scope.user.id,
        project_id: $scope.project.id,
        title: $scope.newTaskTitle,
        description: $scope.newTaskDescription
      });
      task.$save().then(function(project){
        $scope.newTaskTitle = '';
        $scope.newTaskDescription = '';
        $state.go('tasks');
      });
    };

    $scope.addTaskForProject = function() {
      if($scope.newTaskTitle === '') { return; };
      var task = new Task({
        user_id: $scope.user.id,
        project_id: $scope.project.id,
        title: $scope.newTaskTitle,
        description: $scope.newTaskDescription
      });
      task.$save().then(function(task){
        $scope.newTaskTitle = '';
        $scope.newTaskDescription = '';
        $state.go('show_project', { project_id: $scope.project.id });
      });
    };

    $scope.updateTask = function() {
      if($scope.task.title === '') { return; };
      $scope.task.project_id = $scope.task.project.id;
      Task.update({ id: $scope.task.id }, $scope.task);
      $state.go('show_task', { task_id: $scope.task.id });
    };

  }
])