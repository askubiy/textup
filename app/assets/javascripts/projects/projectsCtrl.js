angular.module('textUp')
.controller('ProjectsCtrl', [
  '$scope',
  '$state',
  'Project',
  'projects',

  function($scope, $state, Project, projects){
    $scope.projects = projects.projects;
    $scope.project = projects.project;
    $scope.customers = projects.customers;
    $scope.customer = projects.customer;
    $scope.customerId = undefined;
    $scope.user = projects.user;
    $scope.newProjectTitle = '';
    $scope.newProjectDescription = '';

    $scope.destroyProject = function(project) {
      if (confirm('Вы уверены что хотите удалить этот проект?')) {
        Project.remove({user_id: $scope.user.id, id: project.id}, function() {
          $scope.projects.splice($scope.projects.indexOf(project), 1);
        });
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