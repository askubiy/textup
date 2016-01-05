angular.module('textUp')
.controller('CustomersCtrl', [
  '$scope',
  '$state',
  '$timeout',
  'Customer',
  'customers',

  function($scope, $state, $timeout, Customer, customers){
    $scope.customers = customers.customers;
    $scope.customer = customers.customer;
    $scope.newCustomerColour = "#FFFFFF";
    $scope.newCustomerName = '';
    $scope.user = customers.user;

    angular.element(document).ready(function () {
      $timeout(function(){
        $('#color-picker').colorPicker({
          showHexField: false,
          onColorChange : function(id, newValue) {
            $scope.newCustomerColour = newValue;
          }
        });
        },
      70);
    });

    $scope.destroyCustomer = function(customer) {
      if (confirm('Вы уверены что хотите удалить этого заказчика?')) {
        Customer.remove({user_id: $scope.user.id, id: customer.id}, function() {
          $scope.customers.splice($scope.customers.indexOf(customer), 1);
        });
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
      customer.$save();
      $scope.newCustomerName = '';
      $scope.newCustomerDescription = '';
      $state.go('show_customer', {customer_id: customer.id});
    };

    $scope.updateCustomer = function() {
      if($scope.customer.name === '') { return; };
      $scope.customer.colour = $scope.newCustomerColour;
      Customer.update({ id: $scope.customer.id }, $scope.customer);
      $state.go('show_customer', {customer_id: $scope.customer.id});
    };

  }
])