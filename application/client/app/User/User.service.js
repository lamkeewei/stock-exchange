'use strict';

angular.module('applicationApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id', {}, {});
  });
