angular.module('textUp')
.controller('ChecksCtrl', [
  '$scope',
  '$state',
  '$translate',
  'Check',
  'checks',
  'notifications',

  function($scope, $state, $translate, Check, checks, notifications){
    $scope.task = checks.task;
    $scope.user = checks.user;
    $scope.check_statuses = checks.check_statuses;
    $scope.currencies = checks.currencies;

    $scope.addPayment = function() {
      if($scope.newPrice === '') { return; };
      if(!$scope.status && !$scope.currency) { return; };
      var check = new Check({
        task_id: $scope.task.id,
        user_id: $scope.user.id,
        currency_id: $scope.currency.id,
        check_status_id: $scope.status.id,
        check_type_id: 1,
        price: $scope.newPrice
      });
      check.$save().then(function(check){
        $translate(['payment', 'added_success']).then(
          function(translations){
            var message = translations.payment + " " + translations.added_success;
            notifications.addNotification(message, "success");
            $state.go('show_task', { task_id: $scope.task.id });
          }
        );
      });
    };
  }
]);