'use strict';

angular.module('applicationApp')
  .factory('Sell', function ($resource) {
    return $resource('/api/sells/:id', {}, {});
  });
