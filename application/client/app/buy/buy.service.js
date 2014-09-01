'use strict';

angular.module('applicationApp')
  .factory('Buy', function ($resource) {
    return $resource('/api/buys/:action:id/:userId', {}, {
      getByUserId: {
        method: 'GET',
        isArray: true,
        params: {
          action: 'user'
        }
      },

      deleteAll: {
        method: 'DELETE',
        params: {
          action: 'all'
        }
      }
    });
  });
