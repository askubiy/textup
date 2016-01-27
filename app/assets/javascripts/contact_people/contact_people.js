angular.module('textUp.contact_people', ['ui.router']).

config([
  '$stateProvider',

  function config($stateProvider) {
    $stateProvider
      .state('contact_people', {
        url: '/contact_people',
        templateUrl: 'contact_people/_index.html',
        controller: 'ContactsCtrl',

        resolve: {
          contact_people: ['$state', 'Auth', 'ContactPerson', '$q',
            function($state, Auth, ContactPerson, $q){
              var deferred = $q.defer();
              Auth.currentUser().then(
                function(user){
                  ContactPerson.query({user_id: user.id}).$promise.then(
                    function(contact_people){
                      deferred.resolve({
                        contact_people: contact_people,
                        user: user
                      });
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

      .state('new_contact_person', {
        url: '/contact_people/new',
        templateUrl: 'contact_people/_new.html',
        controller: 'ContactsCtrl',

        resolve: {
          contact_people: ['$state', 'Auth', '$translate', 'notifications',
            'Customer', 'ContactPerson', '$q',
            function($state, Auth, $translate, notifications, Customer, ContactPerson, $q){
              var deferred = $q.defer();
              Auth.currentUser().then(
                function(user){
                  Customer.query({user_id: user.id}).$promise.then(
                    function(customers){
                      if (customers.length == 0) {
                        var message = "";
                        $translate('no_customers_contact_error').then(
                          function(no_customers_contact_error){
                            message = no_customers_contact_error;
                            notifications.addNotification(message, "danger");
                          }
                        );
                        $state.go('contact_people');
                      }
                      deferred.resolve({
                        customers: customers,
                        user: user
                      });
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

      .state('edit_contact_person', {
        url: '/contact_people/:contact_person_id/edit',
        templateUrl: 'contact_people/_edit.html',
        controller: 'ContactsCtrl',

        resolve: {
          contact_people: ['$state', 'Auth', 'ContactPerson', '$stateParams', 'Customer', '$q',
            function($state, Auth, ContactPerson, $stateParams, Customer, $q){
              var deferred = $q.defer();
              Auth.currentUser().then(
                function(user){
                  ContactPerson.get({user_id: user.id, id: $stateParams.contact_person_id}).$promise.then(
                    function(contact_person){
                      Customer.query({user_id: user.id}).$promise.then(
                        function(customers){
                          deferred.resolve({
                            customers: customers,
                            contact_person: contact_person
                          });
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

      .state('show_contact_person', {
        url: '/contact_people/:contact_person_id/show',
        templateUrl: 'contact_people/_show.html',
        controller: 'ContactsCtrl',

        resolve: {
          contact_people: ['$state', 'Auth', 'ContactPerson', '$stateParams', '$q',
            function($state, Auth, ContactPerson, $stateParams, $q){
              var deferred = $q.defer();
              Auth.currentUser().then(
                function(user){
                  ContactPerson.query({user_id: user.id}).$promise.then(
                    function(contact_people){
                      ContactPerson.get({user_id: user.id, id: $stateParams.contact_person_id}).$promise.then(
                        function(contact_person){
                          deferred.resolve({
                            contact_people: contact_people,
                            contact_person: contact_person,
                            user: user
                          });
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
      });
  }
]);