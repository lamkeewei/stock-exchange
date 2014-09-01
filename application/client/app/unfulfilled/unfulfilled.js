'use strict';

angular.module('applicationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.unfulfilled', {
        url: 'unfulfilled',
        views: {
          'content@': {
            controller: 'UnfulfilledCtrl',
            templateUrl: 'app/unfulfilled/unfulfilled.html'
          }
        }
      });
  });