angular.module('textUp')

.directive('dateTimePicker', ['$timeout', function ($timeout) {
  return {
    require: 'ngModel',
    restrict: 'A',

    link: function (scope, elem, attrs, ngModel) {
      return $timeout(function() {
        $timeout(function() {
          $(elem).datetimepicker({
            pick12HourFormat: scope.pick12HourFormat,
            locale: 'ru',
            allowInputToggle: true,
            useCurrent: false,
            //keepInvalid: true,
            extraFormats: ["YYYY-MM-DDTHH:mm:ss.SSSZ"]
            //defaultDate: moment()
          }).on('dp.change', function(event) {
            scope.$apply(function() {
              ngModel.$setViewValue(event.date);
            });
          });
        }, 0);
      }, 0);
    }
  };

}]);
