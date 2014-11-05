'use strict';

angular.module('applicationApp')
  .factory('Sell', function ($resource) {
    return $resource('/api/sells/:id:action/:stock', {}, {
      deleteAll: {
        method: 'DELETE',
        params: {
          action: 'all'
        }
      },

      getLowestAsk: {
        method: 'GET',
        isArray: true,
        params: {
          action: 'lowest'
        }
      }
    });
  });
