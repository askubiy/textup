angular.module('textUp')

.directive('dateTimePicker', ['$timeout', function ($timeout) {
  return {
    require: 'ngModel',
    restrict: 'A',

    link: function (scope, elem, attrs, ngModel) {
      return $timeout(function() {
        $timeout(function() {
          if (!ngModel.$modelValue) {
            ngModel.$setViewValue(moment());
          };

          $(elem).datetimepicker({
            pick12HourFormat: scope.pick12HourFormat,
            locale: 'ru',
            allowInputToggle: true,
            useCurrent: true,
            //keepInvalid: true,
            extraFormats: ["YYYY-MM-DDTHH:mm:ss.SSSZ"],
            defaultDate: moment()
          }).on('dp.change', function(event) {
            console.log('dp.change');
            scope.$apply(function() {
              ngModel.$setViewValue(event.date);
            });
          });
        }, 0);
      }, 0);
    }
  };

}]);
