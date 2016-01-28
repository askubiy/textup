angular.module('textUp')
.factory('calendarEvents', [
  'Task',
  'Auth',
  'moment',

  function(Task, Auth, moment){
    var o = {
      events: []
    };

    var statusMapping = {
      "new": null,
      "open": "success",
      "in_work": "warning",
      "done": "special",
      "paused": "inverse",
      "paid": "important"
    };

    o.getAll = function() {
      return Auth.currentUser().then(function(user){
        return Task.query({user_id: user.id}).$promise.then(
          function(data){
            angular.copy(data, o.events);
          });
      });
    };

    o.formatEvents = function(excludeTypes) {
      var formattedEvents = [];
      angular.forEach(o.events, function(rawEvent) {
        if (excludeTypes && excludeTypes.indexOf(rawEvent.status.status_type) != -1) {
          return;
        }
        var formatedEvent = {
          id: rawEvent.id,
          title: rawEvent.title + " (" + (rawEvent.project ? rawEvent.project.title : rawEvent.customer.name) + ")",
          type: statusMapping[rawEvent.status.status_type],
          startsAt: new Date(rawEvent.started_at),
          endsAt: new Date(rawEvent.estimated_finish),
          editable: false,
          deletable: false
        };
        this.push(formatedEvent);
      }, formattedEvents);

      return formattedEvents;
    };

    return o;

  }
]);