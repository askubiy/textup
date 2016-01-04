angular.module('textUp')
.factory('customers', [
  '$http',
  'Auth',
  function($http, Auth){
    var o = {
      customers: []
    };

    o.getAll = function(user_id) {
      Auth.currentUser().then(function (user){
        return $http.get('users/' + user.id + '/customers.json').success(function(data){
          angular.copy(data, o.customers);
        });
      });
    };

    o.create = function(customer) {
      return $http.post('/customers.json', customer).success(function(data){
        o.customers.push(data);
      });
    };

    o.get = function(id) {
      Auth.currentUser().then(function (user){
        return $http.get('users/' + Auth.currentUser().id + '/customers/' + id + '.json')
          .then(function(res){
            return res.data;
        });
      });
    };

    return o;
  }
])