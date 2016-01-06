angular.module('textUp')

.directive('colorPicker', function () {
  return {
    restrict: 'A',

    link: function(scope, element, attrs) {
      if (scope.customer) {
        scope.customer.$promise.then(function(customer){
          element.val(customer.colour);
          $(element).colorPicker({
            showHexField: false,
            onColorChange: function(id, newValue) {
              scope.newCustomerColour = newValue;
            }
          });
        });
      } else {
        $(element).colorPicker({
            showHexField: false,
            onColorChange: function(id, newValue) {
              scope.newCustomerColour = newValue;
            }
          });
      };

    }
  };

});