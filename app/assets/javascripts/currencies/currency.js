angular.module('textUp')
.factory('Currency', [
  '$http',
  '$resource',

  function($http, $resource){
    return $resource('/currencies/:id',
      { id: '@id' }
    );
  }
])