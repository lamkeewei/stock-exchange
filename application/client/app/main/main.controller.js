'use strict';

angular.module('applicationApp')
  .controller('MainCtrl', function ($scope, Stats, stocks) {    
    $scope.stocks = stocks;
  });