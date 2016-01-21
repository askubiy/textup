angular.module('textUp')
.controller('NavCtrl', [
  '$state',
  '$scope',
  'Auth',
  function($state, $scope, Auth){
    $scope.signedIn = Auth.isAuthenticated;
    $scope.logout = Auth.logout;
    Auth.currentUser().then(function (user){
      $scope.user = user;
    });

    $scope.$on('devise:new-registration', function (e, user){
      $scope.user = user;
    });

    $scope.$on('devise:login', function (e, user){
      $scope.user = user;
    });

    $scope.$on('devise:logout', function (e, user){
      $scope.user = {};
      location.reload();
      $state.go('welcome');
    });
  }
]);