angular.module('textUp')
.controller('ContactsCtrl', [
  '$scope',
  '$state',
  'ContactPerson',
  'contact_people',

  function($scope, $state, ContactPerson, contact_people){
    $scope.contact_people = contact_people.contact_people;
    $scope.contact_person = contact_people.contact_person;
    $scope.customers = contact_people.customers;
    $scope.customer = contact_people.customer;
    $scope.user = contact_people.user;

    $scope.destroyContact = function(contact_person, redirectState) {
      if (confirm('Вы уверены что хотите удалить эту задачу?')) {
        ContactPerson.remove({user_id: $scope.user.id, id: contact_person.id}, function() {
          $scope.contact_people.splice($scope.contact_people.indexOf(contact_person), 1);
        });
      };

      if (redirectState) {
        $state.go(redirectState);
      };
    };

    $scope.addContact = function(redirectState) {
      if($scope.newContactFirstName === '') { return; };
      var task = new ContactPerson({
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
      task.$save().then(function(task){
        $scope.newContactFirstName = '';
        $scope.newContactMiddleName = '';
        $scope.newContactLastName = '';
        $scope.newContactPosition = '';
        if (redirectState) {
          $state.go(redirectState);
        } else {
          $state.go('contact_people');
        };
      });
    };

    $scope.updateContact = function() {
      if($scope.contact_person.first_name === '') { return; };
      $scope.contact_person.customer_id = $scope.contact_person.customer.id;
      ContactPerson.update({ id: $scope.contact_person.id }, $scope.contact_person);
      $state.go('show_contact_person', { contact_person_id: $scope.contact_person.id });
    };

  }
])