angular.module('textUp')
.factory('Customer', [
  '$http',
  '$resource',

  function($http, $resource){
    return $resource('/users/:user_id/customers/:id', {user_id: '@user_id', id: '@id'},
      {
        'update': { method: 'PUT' }
      }
    );
  }
])