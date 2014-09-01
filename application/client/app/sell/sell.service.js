'use strict';

angular.module('applicationApp')
  .factory('Sell', function ($resource) {
    return $resource('/api/sells/:id:action', {}, {
      deleteAll: {
        method: 'DELETE',
        params: {
          action: 'all'
        }
      }
    });
  });
