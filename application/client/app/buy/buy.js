'use strict';

angular.module('applicationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.buy', {
        url: 'buy',        
        views: {
          'content@': {
            controller: 'BuyCtrl',
            templateUrl: 'app/buy/buy.html'
          }
        },
        authenticate: true
      });
  });