angular.module('textUp')

.directive('dateTimePicker', ['$timeout',
  '$rootScope',
  'I18n',

  function ($timeout, $rootScope, I18n) {
  return {
    require: 'ngModel',
    restrict: 'A',

    link: function (scope, elem, attrs, ngModel, $rootScope) {
      return $timeout(function() {
        $timeout(function() {
          scope.$on('locale:change', function (event, data) {
            $(elem).data("DateTimePicker").locale(data);
          });

          if (!ngModel.$modelValue) {
            ngModel.$setViewValue(moment());
          };

          $(elem).datetimepicker({
            pick12HourFormat: scope.pick12HourFormat,
            locale: I18n.locale,
            allowInputToggle: true,
            useCurrent: true,
            //keepInvalid: true,
            extraFormats: ["YYYY-MM-DDTHH:mm:ss.SSSZ"],
            defaultDate: moment()
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
