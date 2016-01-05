angular.module('textUp')
.factory('Project', [
  '$http',
  '$resource',

  function($http, $resource){
    return $resource('/users/:user_id/projects/:id', {user_id: '@user_id', id: '@id'},
      {
        'update': { method: 'PUT' }
      }
    );
  }
])