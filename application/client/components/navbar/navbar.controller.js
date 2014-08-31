'use strict';

angular.module('applicationApp')
  .controller('NavbarCtrl', function ($scope, $location, $rootScope) {
    $scope.logout = function(){
      $rootScope.user = null;
      $location.path('/');
    };
  });