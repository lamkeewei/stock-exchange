'use strict';

angular.module('applicationApp')
  .controller('NavbarCtrl', function ($scope, $state, $location, $rootScope, $cookieStore) {
    $scope.logout = function(){
      $cookieStore.remove('loginUser');
      $rootScope.user = null;
      $location.path('/');      
    };    
  });