angular.module('textUp')
.controller('CalendarCtrl', [
  '$scope',
  'moment',
  '$window',
  '$state',
  'calendarEvents',
  'calendarConfig',

  function($scope, moment, $window, $state, calendarEvents, calendarConfig){

    $scope.calendarEvents = calendarEvents;

    calendarConfig.dateFormatter = 'moment';
    $window.moment = $window.moment || moment;
    moment.locale('ru');
    var vm = this;

    var originali18n = angular.copy(calendarConfig.i18nStrings);
    calendarConfig.i18nStrings.eventsLabel = 'События';
    calendarConfig.i18nStrings.timeLabel = 'Часы';
    calendarConfig.i18nStrings.weekNumber = 'Неделя {week}';

    //These variables MUST be set as a minimum for the calendar to work
    vm.calendarView = 'month';
    vm.viewDate = new Date();

    vm.events = $scope.calendarEvents.formatEvents();

    vm.isCellOpen = false;

    vm.eventClicked = function(event) {
      $state.go("show_task", { task_id: event.id });
    };
  }
])