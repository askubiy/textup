angular.module('textUp')
.controller('ProjectsCtrl', [
  '$scope',
  '$state',
  'Project',
  'Task',
  'projects',

  function($scope, $state, Project, Task, projects){
    $scope.projects = projects.projects;
    $scope.project = projects.project;
    $scope.customers = projects.customers;
    $scope.customer = projects.customer;
    $scope.customerId = undefined;
    $scope.user = projects.user;
    $scope.newProjectTitle = '';
    $scope.newProjectDescription = '';

    $scope.destroyProject = function(project, redirectState) {
      if (confirm('Вы уверены что хотите удалить этот проект?')) {
        Project.remove({user_id: $scope.user.id, id: project.id}, function() {
          $scope.projects.splice($scope.projects.indexOf(project), 1);
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

    $scope.destroyTask = function(task, redirectState) {
      if (confirm('Вы уверены что хотите удалить эту задачу?')) {
        Task.remove({user_id: $scope.user.id, id: task.id}, function() {
          $scope.project.tasks.splice($scope.project.tasks.indexOf(task), 1);
        });
      };

      if (redirectState) {
        $state.go(redirectState);
      };
    };

    $scope.updateProject = function() {
      if($scope.project.title === '') { return; };
      $scope.project.customer_id = $scope.project.customer.id;
      Project.update({ id: $scope.project.id }, $scope.project);
      $state.go('show_project', { project_id: $scope.project.id });
    };

  }
])