'use strict';

angular.module('applicationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        views: {
          'navbar': {
            controller: 'NavbarCtrl',
            templateUrl: 'components/navbar/navbar.html'
          },

          'content': {
            controller: 'MainCtrl',
            templateUrl: 'app/main/main.html'
          }
        }
      });
  });