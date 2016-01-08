angular.module('textUp', ['ui.router', 'templates', 'Devise', 'ngResource'])
.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'home/_home.html',
      controller: 'MainCtrl',
      resolve: {
        authPromise: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(
            function(){
            },
            function() {
              $state.go('welcome');
            }
          )
        }]
      }
    })

    .state('welcome', {
      url: '/welcome',
      templateUrl: 'welcome/_welcome.html',
      controller: 'WelcomeCtrl'
    })

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

    .state('projects', {
      url: '/projects',
      templateUrl: 'projects/_index.html',
      controller: 'ProjectsCtrl',

      resolve: {
        projects: ['$state', 'Auth', 'Project',
          function($state, Auth, Project){
            return Auth.currentUser().then(
              function(user){
                return {
                  projects: Project.query({user_id: user.id}),
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

    .state('new_project', {
      url: '/projects/new',
      templateUrl: 'projects/_new.html',
      controller: 'ProjectsCtrl',

      resolve: {
        projects: ['$state', 'Auth', 'Project', 'Customer',
          function($state, Auth, Project, Customer){
            return Auth.currentUser().then(
              function(user){
                return {
                  projects: Project.query({user_id: user.id}),
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
    })

    .state('show_project', {
      url: '/projects/:project_id/show',
      templateUrl: 'projects/_show.html',
      controller: 'ProjectsCtrl',

      resolve: {
        projects: ['$state', 'Auth', 'Project', '$stateParams',
          function($state, Auth, Project, $stateParams){
            return Auth.currentUser().then(
              function(user){
                return {
                  projects: Project.query({user_id: user.id}),
                  project: Project.get({user_id: user.id, id: $stateParams.project_id}),
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

    .state('edit_project', {
      url: '/projects/:project_id/edit',
      templateUrl: 'projects/_edit.html',
      controller: 'ProjectsCtrl',

      resolve: {
        projects: ['$state', 'Auth', 'Project', '$stateParams', 'Customer',
          function($state, Auth, Project, $stateParams, Customer){
            return Auth.currentUser().then(
              function(user){
                return {
                  project: Project.get({user_id: user.id, id: $stateParams.project_id}),
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

    .state('login', {
      url: '/login',
      templateUrl: 'auth/_login.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'Auth', function($state, Auth) {
        Auth.currentUser().then(
          function(){
            $state.go('home');
          }
        )
      }]
    })

    .state('register', {
      url: '/register',
      templateUrl: 'auth/_register.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'Auth', function($state, Auth) {
        Auth.currentUser().then(function(){
          $state.go('home');
        })
      }]
    });

  $urlRouterProvider.otherwise('welcome');
}])
