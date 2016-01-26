angular.module('textUp')
.controller('NavCtrl', [
  '$state',
  '$scope',
  '$translate',
  '$rootScope',
  'Auth',

  function($state, $scope, $translate, $rootScope, Auth){
    $rootScope.$on('$stateChangeSuccess',
      function(event, toState, toParams, fromState, fromParams){
        $scope.state_name = toState.name;
      });

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