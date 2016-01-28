angular.module('textUp')
.factory('Comment', [
  '$http',
  '$resource',

  function($http, $resource){
    return $resource('/users/:user_id/tasks/:task_id/comments/:id',
      {
        user_id: '@user_id',
        task_id: "@task_id",
        id: '@id'
      },
      {
        'update': { method: 'PUT' }
      }
    );
  }
])