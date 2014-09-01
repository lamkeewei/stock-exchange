'use strict';

angular.module('applicationApp')
  .controller('UnfulfilledCtrl', function ($scope, buys, sells) {
    $scope.buys = buys;
    $scope.sells = sells;
    $scope.stocks = ['SMU', 'NUS', 'NTU'];
    $scope.filtered = {};
  });
