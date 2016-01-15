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
          contact_people: ['$state', 'Auth', 'ContactPerson',
            function($state, Auth, ContactPerson){
              return Auth.currentUser().then(
                function(user){
                  return {
                    contact_people: ContactPerson.query({user_id: user.id}),
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

      .state('new_contact_person', {
        url: '/contact_people/new',
        templateUrl: 'contact_people/_new.html',
        controller: 'ContactsCtrl',

        resolve: {
          contact_people: ['$state', 'Auth', 'Customer', 'ContactPerson',
            function($state, Auth, Customer, ContactPerson){
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

      .state('edit_contact_person', {
        url: '/contact_people/:contact_person_id/edit',
        templateUrl: 'contact_people/_edit.html',
        controller: 'ContactsCtrl',

        resolve: {
          contact_people: ['$state', 'Auth', 'ContactPerson', '$stateParams', 'Customer',
            function($state, Auth, ContactPerson, $stateParams, Customer){
              return Auth.currentUser().then(
                function(user){
                  return {
                    contact_person: ContactPerson.get({user_id: user.id, id: $stateParams.contact_person_id}),
                    customers: Customer.query({user_id: user.id})
                  }
                },
                function(error){
                  $state.go('welcome');
                });
            }
          ]
        }
      })

      .state('show_contact_person', {
        url: '/contact_people/:contact_person_id/show',
        templateUrl: 'contact_people/_show.html',
        controller: 'ContactsCtrl',

        resolve: {
          contact_people: ['$state', 'Auth', 'ContactPerson', '$stateParams',
            function($state, Auth, ContactPerson, $stateParams){
              return Auth.currentUser().then(
                function(user){
                  return {
                    contact_people: ContactPerson.query({user_id: user.id}),
                    contact_person: ContactPerson.get({user_id: user.id, id: $stateParams.contact_person_id}),
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
  }
]);