angular.module('textUp.customers', ['ui.router']).

config(function config($stateProvider) {

  $stateProvider
    .state('customers', {
      url: '/customers',
      templateUrl: 'customers/_index.html',
      controller: 'CustomersCtrl',

      resolve: {
        customers: ['$state', 'Auth', 'Customer',
          function($state, Auth, Customer){
            return Auth.currentUser().then(
              function(user){
                return {
                  customers: Customer.query({user_id: user.id}),
                  user: user
                }
              },
              function(error){
                $state.go('welcome');
              });
          }
        ]
      }
    })

    .state('new_customer', {
      url: '/customers/new',
      templateUrl: 'customers/_new.html',
      controller: 'CustomersCtrl',

      resolve: {
        customers: ['$state', 'Auth', 'Customer',
          function($state, Auth, Customer){
            return Auth.currentUser().then(
              function(user){
                return {
                  customers: Customer.query({user_id: user.id}),
                  user: user
                }
              },
              function(error){
                $state.go('welcome');
              });
          }
        ]
      }
    })

    .state('show_customer', {
      url: '/customers/:customer_id/show',
      templateUrl: 'customers/_show.html',
      controller: 'CustomersCtrl',

      resolve: {
        customers: ['$state', 'Auth', 'Customer', '$stateParams',
          function($state, Auth, Customer, $stateParams){
            return Auth.currentUser().then(
              function(user){
                return {
                  customers: Customer.query({user_id: user.id}),
                  customer: Customer.get({user_id: user.id, id: $stateParams.customer_id}),
                  user: user
                }
              },
              function(error){
                $state.go('welcome');
              });
          }
        ]
      }
    })

    .state('edit_customer', {
      url: '/customers/:customer_id/edit',
      templateUrl: 'customers/_edit.html',
      controller: 'CustomersCtrl',

      resolve: {
        customers: ['$state', 'Auth', 'Customer', '$stateParams',
          function($state, Auth, Customer, $stateParams){
            return Auth.currentUser().then(
              function(user){
                return {
                  customer: Customer.get({user_id: user.id, id: $stateParams.customer_id})
                }
              },
              function(error){
                $state.go('welcome');
              });
          }
        ]
      }
    })

    .state('new_customer_project', {
      url: '/customers/:customer_id/projects/new',
      templateUrl: 'projects/_customer_new.html',
      controller: 'ProjectsCtrl',

      resolve: {
        projects: ['$state', 'Auth', 'Project', 'Customer', '$stateParams',
          function($state, Auth, Project, Customer, $stateParams){
            return Auth.currentUser().then(
              function(user){
                return {
                  customer: Customer.get({user_id: user.id, id: $stateParams.customer_id}),
                  customers: Customer.query({user_id: user.id}),
                  user: user
                }
              },
              function(error){
                $state.go('welcome');
              });
          }
        ]
      }
    });
});