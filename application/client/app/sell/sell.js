'use strict';

angular.module('applicationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.sell', {
        url: 'sell',        
        views: {
          'content@': {
            controller: 'SellCtrl',
            templateUrl: 'app/sell/sell.html'
          }
        },
        authenticate: true
      });
  });