'use strict';

angular.module('applicationApp')
  .controller('LoginCtrl', function ($scope, $rootScope, $location) {
    $scope.user = {};
    $scope.login = function(form){
      $scope.submitted = true;      

      if (form.$valid) {
        $rootScope.user = $scope.user;
        $location.path('/');
      } 
    };
  });
