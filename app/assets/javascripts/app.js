var app = angular.module('textUp', [
  'ui.router',
  'ui.bootstrap',
  'mwl.calendar',
  'templates',
  'growlNotifications',
  'ngAnimate',
  'pascalprecht.translate',
  'Devise',
  'ngResource',
  'textUp.home',
  'textUp.welcome',
  'textUp.customers',
  'textUp.projects',
  'textUp.tasks',
  'textUp.contact_people'
])
.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$translateProvider',
  'I18n',

function($stateProvider, $urlRouterProvider, $translateProvider, I18n) {
  I18n.defaultLocale = "ru";
  I18n.locale = "ru";

  locale = I18n.currentLocale();
  $translateProvider.translations("ru", I18n.translations["ru"]);
  $translateProvider.translations("en", I18n.translations["en"]);
  $translateProvider.preferredLanguage("ru");

  $stateProvider
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
}]);

app.constant("moment", moment);
app.constant("I18n", I18n);
