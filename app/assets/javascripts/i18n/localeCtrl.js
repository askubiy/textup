angular.module('textUp')
.controller('LocaleCtrl', [
  '$scope',
  '$translate',
  '$rootScope',
  'I18n',

  function($scope, $translate, $rootScope, I18n){
    $scope.currentLanguage = I18n.locale;

    $scope.changeLanguage = function (key) {
      $scope.currentLanguage = key;
      I18n.locale = key;
      $rootScope.$broadcast('locale:change', key);
      $translate.use(key);
    };
  }
])