angular.module('textUp')

.directive('colorPicker', function () {
  return {
    restrict: 'A',

    link: function(scope, element, attrs) {
      scope.customer.$promise.then(function(customer){
        var colorPicker = $(element).colorPicker({
          showHexField: false,
          onColorChange: function(id, newValue) {
            scope.newCustomerColour = newValue;
          }
        });
      });

    }
  };

});