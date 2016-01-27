angular.module('textUp.customers', ['ui.router']).

config([
  '$stateProvider',

  function config($stateProvider) {
    $stateProvider
      .state('customers', {
        url: '/customers',
        templateUrl: 'customers/_index.html',
        controller: 'CustomersCtrl',

        resolve: {
          customers: ['$state', 'Auth', 'Customer', '$q',
            function($state, Auth, Customer, $q){
              var deferred = $q.defer();
              Auth.currentUser().then(
                function(user){
                  Customer.query({user_id: user.id}).$promise.then(
                    function(customers){
                      deferred.resolve({
                        customers: customers,
                        user: user
                      });
                    }
                  )
                },
                function(error){
                  $state.go('welcome');
                }
              );
              return deferred.promise;
            }
          ]
        }
      })

      .state('new_customer', {
        url: '/customers/new',
        templateUrl: 'customers/_new.html',
        controller: 'CustomersCtrl',

        resolve: {
          customers: ['$state', 'Auth', 'Customer', '$q',
            function($state, Auth, Customer, $q){
              var deferred = $q.defer();
              Auth.currentUser().then(
                function(user){
                  Customer.query({user_id: user.id}).$promise.then(
                    function(customers){
                      deferred.resolve({
                        customers: customers,
                        user: user
                      });
                    }
                  )
                },
                function(error){
                  $state.go('welcome');
                }
              );
              return deferred.promise;
            }
          ]
        }
      })

      .state('show_customer', {
        url: '/customers/:customer_id/show',
        templateUrl: 'customers/_show.html',
        controller: 'CustomersCtrl',

        resolve: {
          customers: ['$state', 'Auth', 'Customer', '$stateParams', '$q',
            function($state, Auth, Customer, $stateParams, $q){
              var deferred = $q.defer();
              Auth.currentUser().then(
                function(user){
                  Customer.query({user_id: user.id}).$promise.then(
                    function(customers){
                      Customer.get({user_id: user.id, id: $stateParams.customer_id}).$promise.then(
                        function(customer){
                          deferred.resolve({
                            customers: customers,
                            customer: customer,
                            user: user
                          });
                        }
                      )
                    }
                  )
                },
                function(error){
                  $state.go('welcome');
                }
              );
              return deferred.promise;
            }
          ]
        }
      })

      .state('edit_customer', {
        url: '/customers/:customer_id/edit',
        templateUrl: 'customers/_edit.html',
        controller: 'CustomersCtrl',

        resolve: {
          customers: ['$state', 'Auth', 'Customer', '$stateParams', '$q',
            function($state, Auth, Customer, $stateParams, $q){
              var deferred = $q.defer();
              Auth.currentUser().then(
                function(user){
                  Customer.get({user_id: user.id, id: $stateParams.customer_id}).$promise.then(
                    function(customer){
                      deferred.resolve({
                        customer: customer,
                        user: user
                      });
                    }
                  )
                },
                function(error){
                  $state.go('welcome');
                }
              );
              return deferred.promise;
            }
          ]
        }
      })

      .state('new_customer_contact_person', {
        url: '/customers/:customer_id/contact_people/new',
        templateUrl: 'contact_people/_customer_new.html',
        controller: 'ContactsCtrl',

        resolve: {
          contact_people: ['$state', 'Auth', 'Customer', '$stateParams', '$q',
            function($state, Auth, Customer, $stateParams, $q){
              var deferred = $q.defer();
              Auth.currentUser().then(
                function(user){
                  Customer.query({user_id: user.id}).$promise.then(
                    function(customers){
                      Customer.get({user_id: user.id, id: $stateParams.customer_id}).$promise.then(
                        function(customer){
                          deferred.resolve({
                            customers: customers,
                            customer: customer,
                            user: user
                          });
                        }
                      )
                    }
                  )
                },
                function(error){
                  $state.go('welcome');
                }
              );
              return deferred.promise;
            }
          ]
        }
      })

      .state('new_customer_task', {
        url: '/customers/:customer_id/tasks/new',
        templateUrl: 'tasks/_new.html',
        controller: 'TasksCtrl',

        resolve: {
          tasks: ['$state', 'Auth', 'Task',
            '$stateParams', 'Project', 'Customer', 'Status', '$q',
            function($state, Auth, Task, $stateParams, Project, Customer, Status, $q){
              var deferred = $q.defer();
              Auth.currentUser().then(
                function(user){
                  Customer.query({user_id: user.id}).$promise.then(
                    function(customers){
                      Customer.get({user_id: user.id, id: $stateParams.customer_id }).$promise.then(
                        function(customer){
                          Project.query({user_id: user.id}).$promise.then(
                            function(projects){
                              Status.query().$promise.then(
                                function(statuses){
                                  deferred.resolve({
                                    customers: customers,
                                    customer: customer,
                                    projects: projects,
                                    statuses: statuses,
                                    user: user
                                  });
                                }
                              );
                            }
                          );
                        }
                      );
                    }
                  );
                },
                function(error){
                  $state.go('welcome');
                }
              );

              return deferred.promise;
            }
          ]
        }
      })

      .state('new_customer_project', {
        url: '/customers/:customer_id/projects/new',
        templateUrl: 'projects/_customer_new.html',
        controller: 'ProjectsCtrl',

        resolve: {
          projects: ['$state', 'Auth', 'Customer', '$stateParams', '$q',
            function($state, Auth, Customer, $stateParams, $q){
              var deferred = $q.defer();
              Auth.currentUser().then(
                function(user){
                  Customer.query({user_id: user.id}).$promise.then(
                    function(customers){
                      Customer.get({user_id: user.id, id: $stateParams.customer_id}).$promise.then(
                        function(customer){
                          deferred.resolve({
                            customers: customers,
                            customer: customer,
                            user: user
                          });
                        }
                      )
                    }
                  )
                },
                function(error){
                  $state.go('welcome');
                }
              );
              return deferred.promise;
            }
          ]
        }
      });
  }
]);