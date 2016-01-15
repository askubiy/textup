angular.module('textUp')
.factory('ContactPerson', [
  '$http',
  '$resource',

  function($http, $resource){
    return $resource('/users/:user_id/contact_people/:id', {user_id: '@user_id', id: '@id'},
      {
        'update': { method: 'PUT' }
      }
    );
  }
])