angular.module('textUp')
.controller('TasksCtrl', [
  '$scope',
  '$state',
  'Task',
  'tasks',

  function($scope, $state, Task, tasks){
    $scope.tasks = tasks.tasks;
    $scope.user = tasks.user;

    $scope.destroyTask = function(task, redirectState) {
      if (confirm('Вы уверены что хотите удалить этот проект?')) {
        Task.remove({user_id: $scope.user.id, id: task.id}, function() {
          $scope.tasks.splice($scope.tasks.indexOf(task), 1);
        });
      };

      if (redirectState) {
        $state.go(redirectState);
      };
    };

    $scope.addProject = function() {
      if($scope.newProjectTitle === '') { return; };
      var project = new Project({
        user_id: $scope.user.id,
        customer_id: $scope.customerId.id,
        title: $scope.newProjectTitle,
        description: $scope.newProjectDescription
      });
      project.$save().then(function(project){
        $scope.newProjectTitle = '';
        $scope.newProjectDescription = '';
        $state.go('projects');
      });
    };

    $scope.addProjectForCustomer = function() {
      if($scope.newProjectTitle === '') { return; };
      var project = new Project({
        user_id: $scope.user.id,
        customer_id: $scope.customer.id,
        title: $scope.newProjectTitle,
        description: $scope.newProjectDescription
      });
      project.$save().then(function(project){
        $scope.newProjectTitle = '';
        $scope.newProjectDescription = '';
        $state.go('show_customer', { customer_id: $scope.customer.id });
      });
    };

    $scope.updateProject = function() {
      if($scope.project.title === '') { return; };
      $scope.project.customer_id = $scope.project.customer.id;
      Project.update({ id: $scope.project.id }, $scope.project);
      $state.go('show_project', { project_id: $scope.project.id });
    };

  }
])