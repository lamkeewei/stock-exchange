'use strict';

angular.module('applicationApp')
  .controller('UnfulfilledCtrl', function ($scope, Buy, Sell) {
    $scope.buys = Buy.query();
    $scope.sells = Sell.query();
    $scope.stocks = ['SMU', 'NUS', 'NTU'];
    $scope.filtered = {};
  });
