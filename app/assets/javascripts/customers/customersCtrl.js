angular.module('textUp')
.controller('CustomersCtrl', [
  '$scope',
  '$state',
  '$timeout',
  'Project',
  'Customer',
  'customers',

  function($scope, $state, $timeout, Project, Customer, customers){
    $scope.customers = customers.customers;
    $scope.customer = customers.customer;
    $scope.newCustomerColour = "#FFFFFF";
    $scope.newCustomerName = '';
    $scope.user = customers.user;

    $scope.destroyCustomer = function(customer, redirectState) {
      if (confirm('Вы уверены что хотите удалить этого заказчика?')) {
        Customer.remove({user_id: $scope.user.id, id: customer.id}, function() {
          $scope.customers.splice($scope.customers.indexOf(customer), 1);
        });
      };

      if (redirectState) {
        $state.go(redirectState);
      };
    };

    $scope.destroyProject = function(project, goBack) {
      if (confirm('Вы уверены что хотите удалить этот проект?')) {
        Project.remove({user_id: $scope.user.id, id: project.id}, function() {
          $scope.customer.projects.splice($scope.customer.projects.indexOf(project), 1);
        });
      };

      if (goBack) {
        history.back();
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
        $scope.newCustomerName = '';
        $scope.newCustomerDescription = '';
        $state.go('show_customer', {customer_id: customer.id});
      });
    };

    $scope.updateCustomer = function() {
      if($scope.customer.name === '') { return; };
      $scope.customer.colour = $scope.newCustomerColour;
      Customer.update({ id: $scope.customer.id }, $scope.customer);
      $state.go('show_customer', {customer_id: $scope.customer.id});
    };

  }
])