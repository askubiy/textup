angular.module('textUp')
.controller('CalendarCtrl', [
  '$scope',
  'moment',
  '$window',
  '$state',
  '$translate',
  'calendarEvents',
  'calendarConfig',
  '$rootScope',
  'I18n',

  function($scope, moment, $window, $state, $translate, calendarEvents, calendarConfig, $rootScope, I18n){
    $scope.calendarEvents = calendarEvents;

    calendarConfig.dateFormatter = 'moment';
    $window.moment = $window.moment || moment;
    moment.locale(I18n.locale);
    var vm = this;

    var originali18n = angular.copy(calendarConfig.i18nStrings);
    var rui18n = {
      eventsLabel: 'События',
      timeLabel: 'Часы',
      weekNumber: 'Неделя {week}',
    };

    var locales = {
      ru: rui18n,
      en: originali18n
    };

    calendarConfig.i18nStrings = locales[I18n.locale];
    vm.calendarView = 'month';
    vm.viewDate = new Date();

    vm.events = $scope.calendarEvents.formatEvents();

    vm.isCellOpen = false;

    $scope.$on('locale:change', function (event, data) {
      moment.locale(data);
      calendarConfig.i18nStrings = locales[data];
    });

    vm.eventClicked = function(event) {
      $state.go("show_task", { task_id: event.id });
    };
  }
])