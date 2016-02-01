angular.module('textUp')
.factory('Check', [
  '$http',
  '$resource',

  function($http, $resource){
    return $resource('/users/:user_id/tasks/:task_id/checks/:id',
      { user_id: '@user_id', task_id: '@task_id', id: '@id' },
      {
        'update': { method: 'PUT' }
      }
    );
  }
])