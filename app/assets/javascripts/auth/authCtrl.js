angular.module('textUp')
.controller('AuthCtrl', [
  '$scope',
  '$state',
  'Auth',
  function($scope, $state, Auth){
    $scope.login = function() {
      Auth.login($scope.user).then(
        function(){
          $state.go('home');
        },
        function(error){
          $scope.errors = error.data.error;
        }
      );
    };

    $scope.register = function() {
      Auth.register($scope.user).then(
        function(registeredUser){
          $state.go('home');
        },
        function(error){
          $scope.errors = error.data.errors;
        }
      );
    };
}]);