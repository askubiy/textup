angular.module('textUp')
.controller('CustomersCtrl', [
  '$scope',
  'Customer',
  'customers',

  function($scope, Customer, customers){
    $scope.customers = customers.customers;
    $scope.customer = customers.customer;
    $scope.user = customers.user;

    $scope.destroyCustomer = function(index) {
      if (confirm('Вы уверены что хотите удалить этого заказчика?')) {
        Customer.remove({user_id: $scope.user.id, id: $scope.customers[index].id}, function() {
          $scope.customers.splice(index, 1);
        });
      };
    };

    $scope.addCustomer = function() {
      if($scope.newCustomerName === '') { return; }
      var customer = new Customer({
        user_id: $scope.user.id,
        name: $scope.newCustomerName,
        description: $scope.newCustomerDescription
      });
      customer.$save();
      $scope.newCustomerName = '';
      $scope.newCustomerDescription = '';
    };

    $scope.updateCustomer = function() {
      if($scope.newCustomerName === '') { return; }
      Customer.update({ id: $scope.customer.id }, $scope.customer);
    }

  }
])