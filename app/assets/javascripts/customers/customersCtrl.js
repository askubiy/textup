angular.module('textUp')
.controller('CustomersCtrl', [
  '$scope',
  '$state',
  '$timeout',
  '$translate',
  'Project',
  'Customer',
  'Task',
  'customers',
  'notifications',

  function($scope, $state, $timeout, $translate, Project, Customer, Task, customers, notifications){
    $scope.customers = customers.customers;
    $scope.customer = customers.customer;
    $scope.newCustomerColour = "#FFFFFF";
    $scope.newCustomerName = '';
    $scope.user = customers.user;
    $scope.sortType = 'name';
    $scope.sortReverse = false;

    $scope.taskSortType = 'title';
    $scope.taskSortReverse = false;

    $scope.projectSortType = 'title';
    $scope.projectSortReverse = false;

    $scope.rowClick = function(state, options){
      $state.go(state, options);
    };

    $scope.destroyCustomer = function(customer, redirectState) {
      $translate(['confirm_delete', 'customer', 'deleted_success']).then(
        function(translations){
          if (confirm(translations.confirm_delete)) {
            Customer.remove({user_id: $scope.user.id, id: customer.id}, function() {
              $scope.customers.splice($scope.customers.indexOf(customer), 1);
              var message = translations.customer + " '" +
                customer.name + "' " + translations.deleted_success;
              notifications.addNotification(message, "success");
              if (redirectState) {
                $state.go(redirectState);
              };
            });
          };
        }
      );
    };

    $scope.destroyProject = function(project) {
      $translate(['confirm_delete', 'project', 'deleted_success']).then(
        function(translations) {
          if (confirm(translations.confirm_delete)) {
            Project.remove({user_id: $scope.user.id, id: project.id}, function() {
              $scope.customer.projects.splice($scope.customer.projects.indexOf(project), 1);
              var message = translations.project + " '" + project.title +
                "' " + translations.deleted_success;
              notifications.addNotification(message, "success");
            });
          };
        }
      );
    };

    $scope.destroyTask = function(task, redirectState) {
      $translate(['confirm_delete', 'task', 'deleted_success']).then(
        function(translations){
          if (confirm(translations.confirm_delete)) {
            Task.remove({user_id: $scope.user.id, id: task.id}, function() {
              $scope.customer.tasks.splice($scope.customer.tasks.indexOf(task), 1);
              var message = translations.task + " '" + task.title +
                "' " + translations.deleted_success;
              notifications.addNotification(message, "success");
            });
          };
        }
      );
      if (redirectState) {
        $state.go(redirectState);
      };
    };

    $scope.addCustomer = function() {
      if($scope.newCustomerName === '') { return; };
      var customer = new Customer({
        user_id: $scope.user.id,
        name: $scope.newCustomerName,
        description: $scope.newCustomerDescription,
        colour: $scope.newCustomerColour
      });
      customer.$save().then(function(customer){
        $translate(['customer', 'added_success']).then(
          function(translations){
            var message = translations.customer + " '" +
              customer.name + "' " + translations.added_success;
            notifications.addNotification(message, "success");
          }
        );
        $state.go('show_customer', {customer_id: customer.id});
      });
    };

    $scope.updateCustomer = function() {
      if(!$scope.customer.name) { return; };
      $scope.customer.colour = $scope.newCustomerColour;
      Customer.update({ id: $scope.customer.id }, $scope.customer)
        .$promise.then(
          function(customer){
            $translate(['customer', 'updated_success']).then(
              function(translations){
                var message = translations.customer + " '" +
                  customer.name + "' " + translations.updated_success;
                notifications.addNotification(message, "success");
              }
            );
            $state.go('show_customer', {customer_id: customer.id});
          }
        );
    };

  }
])