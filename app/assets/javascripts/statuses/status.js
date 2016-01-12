angular.module('textUp')
.factory('Status', [
  '$http',
  '$resource',

  function($http, $resource){
    return $resource('/statuses');
  }
])