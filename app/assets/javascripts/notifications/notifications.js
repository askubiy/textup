angular.module('textUp')
.factory('notifications', [
  '$rootScope',

  function($rootScope){
    var o = {
    };

    o.addNotification = function(message, type) {
      var notification = {
        message: message,
        type: type
      };

      $rootScope.$broadcast('notification:add', notification);

    };

    return o;
  }
]);