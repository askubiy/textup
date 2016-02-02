angular.module('textUp.checks', ['ui.router'])

.config([
  '$stateProvider',

  function config($stateProvider) {
    $stateProvider
      .state('edit_check', {
        url: '/tasks/:task_id/checks/:check_id/edit',
        templateUrl: 'checks/_edit.html',
        controller: 'ChecksCtrl',

        resolve: {
          checks: ['$state', 'Auth', '$stateParams', 'Check',
            'CheckStatus', 'Currency', 'Task', '$q',
            function($state, Auth, $stateParams, Check, CheckStatus, Currency, Task, $q){
              var deferred = $q.defer();
              Auth.currentUser().then(
                function(user){
                  Task.get({user_id: user.id, id: $stateParams.task_id}).$promise.then(
                    function(task){
                      CheckStatus.query().$promise.then(
                        function(checkStatuses){
                          Check.get({ task_id: $stateParams.task_id,
                            user_id: user.id, id: $stateParams.check_id}).$promise.then(
                            function(check){
                              Currency.query().$promise.then(
                                function(currencies){
                                  deferred.resolve({
                                    task: task,
                                    check: check,
                                    currencies: currencies,
                                    check_statuses: checkStatuses,
                                    user: user
                                  });
                                }
                              );
                            }
                          );
                        }
                      );
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

      .state('new_check', {
        url: '/tasks/:task_id/checks/new',
        templateUrl: 'checks/_new.html',
        controller: 'ChecksCtrl',

        resolve: {
          checks: ['$state', 'Auth', '$stateParams', 'Check',
            'CheckStatus', 'Currency', 'Task', '$q',
            function($state, Auth, $stateParams, Check, CheckStatus, Currency, Task, $q){
              var deferred = $q.defer();
              Auth.currentUser().then(
                function(user){
                  Task.get({user_id: user.id, id: $stateParams.task_id}).$promise.then(
                    function(task){
                      CheckStatus.query().$promise.then(
                        function(checkStatuses){
                          Currency.query().$promise.then(
                            function(currencies){
                              deferred.resolve({
                                task: task,
                                currencies: currencies,
                                check_statuses: checkStatuses,
                                user: user
                              });
                            }
                          );
                        }
                      );
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
