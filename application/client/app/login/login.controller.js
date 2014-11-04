'use strict';

angular.module('applicationApp')
  .controller('LoginCtrl', function ($scope, $rootScope, $location, $cookieStore) {
    $scope.user = {};
    $scope.login = function(form){
      $scope.submitted = true;      

      if (form.$valid) {
        $cookieStore.put('loginUser', $scope.user); 
        $rootScope.user = $scope.user;
        $location.path('/');
      } 
    };
  });
