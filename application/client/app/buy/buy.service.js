'use strict';

angular.module('applicationApp')
  .factory('Buy', function ($resource) {
    return $resource('/api/buys/:action:id/:userId:stock', {}, {
      getByUserId: {
        method: 'GET',
        isArray: true,
        params: {
          action: 'user'
        }
      },

      endTradingDay: {
        method: 'GET',
        params: {
          action: 'end'
        }
      },

      getLatestPrice: {
        method: 'GET',
        isArray: true,
        params: {
          action: 'price'
        }
      },

      getHighestBid: {
        method: 'GET',
        isArray: true,
        params: {
          action: 'highest'
        }
      }
    });
  });
