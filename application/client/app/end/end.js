'use strict';

angular.module('applicationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.end', {
        url: 'end',
        views: {
          'content@': {
            controller: 'EndCtrl',
            templateUrl: 'app/end/end.html',
          }
        }
      });
  });