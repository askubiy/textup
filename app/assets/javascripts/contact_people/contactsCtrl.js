angular.module('textUp')
.controller('ContactsCtrl', [
  '$scope',
  '$state',
  '$translate',
  'ContactPerson',
  'contact_people',
  'notifications',

  function($scope, $state, $translate, ContactPerson, contact_people, notifications){
    $scope.contact_people = contact_people.contact_people;
    $scope.contact_person = contact_people.contact_person;
    $scope.customers = contact_people.customers;
    $scope.customer = contact_people.customer;
    $scope.user = contact_people.user;
    $scope.sortType = 'name';
    $scope.sortReverse = false;

    $scope.rowClick = function(state, options){
      $state.go(state, options);
    };

    $scope.destroyContact = function(contact_person, redirectState) {
      $translate(['confirm_delete', 'contact_person', 'deleted_success']).then(
        function(translations){
          if (confirm(translations.confirm_delete)) {
            ContactPerson.remove({user_id: $scope.user.id, id: contact_person.id}, function() {
              $scope.contact_people.splice($scope.contact_people.indexOf(contact_person), 1);
              var message = translations.contact_person + " '" + contact_person.name + "' " + translations.deleted_success;
              notifications.addNotification(message, "success");
              if (redirectState) {
                $state.go(redirectState);
              };
            });
          };
        }
      );
    };

    $scope.addContact = function(redirectState) {
      if(!$scope.customer || !$scope.newContactFirstName ||
        $scope.newContactFirstName === '') {
        return;
      };
      var contact_person = new ContactPerson({
        user_id: $scope.user.id,
        customer_id: $scope.customer.id,
        first_name: $scope.newContactFirstName,
        middle_name: $scope.newContactMiddleName,
        last_name: $scope.newContactLastName,
        position: $scope.newContactPosition,
        email: $scope.newContactEmail,
        phone: $scope.newContactPhone,
        phone2: $scope.newContactPhone2,
        im: $scope.newContactIm,
        comment: $scope.newContactComment,
      });
      contact_person.$save().then(function(contact_person){
        $scope.newContactFirstName = '';
        $scope.newContactMiddleName = '';
        $scope.newContactLastName = '';
        $scope.newContactPosition = '';
        $translate(['contact_person', 'added_success']).then(
          function(translations){
            var message = translations.contact_person + " '" + contact_person.name +
              "' " + translations.added_success;
            notifications.addNotification(message, "success");
          }
        );
        if (redirectState) {
          $state.go(redirectState);
        } else {
          $state.go('contact_people');
        };
      });
    };

    $scope.updateContact = function() {
      if(!$scope.contact_person.customer || !$scope.contact_person.first_name ||
        $scope.contact_person.first_name === '') {
        return;
      };
      $scope.contact_person.customer_id = $scope.contact_person.customer.id;
      ContactPerson.update({ id: $scope.contact_person.id }, $scope.contact_person)
        .$promise.then(
          function(contact_person){
            $translate(['contact_person', 'updated_success']).then(
              function(translations){
                var message = translations.contact_person + " '" + contact_person.name +
                  "' " + translations.updated_success;
                notifications.addNotification(message, "success");
              }
            );
            $state.go('show_contact_person', { contact_person_id: contact_person.id });
          }
        );
    };

  }
])