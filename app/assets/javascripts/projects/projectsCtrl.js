angular.module('textUp')
.controller('ProjectsCtrl', [
  '$scope',
  '$state',
  'Project',
  'projects',

  function($scope, $state, Project, projects){
    $scope.projects = projects.projects;
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
        title: $scope.newProjectTitle,
        description: $scope.newProjectDescription
      });
      project.$save().then(function(project){
        $scope.newProjectTitle = '';
        $scope.newProjectDescription = '';
        $state.go('projects');
      });
    };

  }
])