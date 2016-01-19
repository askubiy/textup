angular.module('textUp')
.controller('NotificationsCtrl', [
  '$scope',
  'notifications',

  function($scope, notifications){
    $scope.$on('notification:add', function (event, data) {
      $scope.notifications = [];
      $scope.notifications.push(data);
    });
  }
])