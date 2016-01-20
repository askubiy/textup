angular.module('textUp')
.factory('notifications', [
  '$rootScope',

  function($rootScope){
    var o = {
    };

    var typeMapping = {
      success: "alert-success",
      warning: "alert-warning",
      danger: "alert-danger",
    };

    o.addNotification = function(message, type) {
      var notification = {
        message: message,
        type: typeMapping[type]
      };

      $rootScope.$broadcast('notification:add', notification);

    };

    return o;
  }
]);