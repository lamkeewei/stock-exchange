'use strict';

angular.module('applicationApp')
  .controller('UnfulfilledCtrl', function ($scope, Buy, Sell, User) {
    $scope.buys = Buy.query();
    $scope.sells = Sell.query();
    $scope.users = User.query();
    
    $scope.stocks = ['SMU', 'NUS', 'NTU'];
    $scope.filtered = {};
  });
