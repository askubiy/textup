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
    $scope.check = checks.check;
    $scope.status = checks.check ? checks.check.check_status : undefined;
    $scope.currency = checks.check ? checks.check.currency : undefined;
    $scope.check_statuses = checks.check_statuses;
    $scope.currencies = checks.currencies;

    $scope.addPayment = function() {
      if(!$scope.newPrice || !$scope.status || !$scope.currency) {
        return;
      };
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

    $scope.destroyPayment = function(check){
      $translate(['confirm_delete', 'payment', 'deleted_success']).then(
        function(translations){
          if (confirm(translations.confirm_delete)) {
            Check.remove({user_id: $scope.user.id, task_id: $scope.task.id, id: check.id}, function() {
              var message = translations.payment + " " + translations.deleted_success;
              notifications.addNotification(message, "success");
              $state.go("show_task", {user_id: $scope.user_id, task_id: $scope.task.id});
            })
          };
        }
      );
    };

    $scope.updatePayment = function() {
      if(!$scope.check.price || !$scope.status || !$scope.currency) {
        return;
      };
      $scope.check.check_status_id = $scope.status.id;
      $scope.check.currency_id = $scope.currency.id;
      Check.update({ user_id: $scope.user.id,
        task_id: $scope.task.id, id: $scope.check.id }, $scope.check)
        .$promise.then(
          function(check){
            $translate(['payment', 'updated_success']).then(
              function(translations){
                var message = translations.payment + " " + translations.updated_success;
                notifications.addNotification(message, "success");
              }
            );
            $state.go('show_task', { task_id: $scope.task.id });
          }
        );
    };

  }
]);