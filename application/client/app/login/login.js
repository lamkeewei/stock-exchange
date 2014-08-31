'use strict';

angular.module('applicationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.login', {
        url: 'login',        
        views: {
          'content@': {
            controller: 'LoginCtrl',
            templateUrl: 'app/login/login.html'
          }
        }
      });
  });