'use strict';

angular.module('applicationApp')
  .factory('Stats', function ($resource) {
    return $resource('/api/stats/:stock', {}, {});
  });
