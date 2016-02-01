angular.module('textUp')
.factory('CheckStatus', [
  '$http',
  '$resource',

  function($http, $resource){
    return $resource('/check_statuses/:id',
      { id: '@id' }
    );
  }
])