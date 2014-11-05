'use strict';

angular.module('applicationApp')
  .controller('MainCtrl', function ($scope, Buy, Sell, $q) {  
    var promises = [];

    $scope.highestBids = {};

    promises.push(Buy.getHighestBid({ stock: 'SMU' }).$promise);
    promises.push(Buy.getHighestBid({ stock: 'NUS' }).$promise);
    promises.push(Buy.getHighestBid({ stock: 'NTU' }).$promise);

    $q.all(promises).then(function(stocks){
      $scope.highestBids.SMU = stocks[0].length > 0 ? stocks[0][0].price : 0;
      $scope.highestBids.NTU = stocks[1].length > 0 ? stocks[1][0].price : 0;
      $scope.highestBids.NUS = stocks[2].length > 0 ? stocks[2][0].price : 0; 
    });

    var promises = [];

    $scope.lowestAsks = {};

    promises.push(Sell.getLowestAsk({ stock: 'SMU' }).$promise);
    promises.push(Sell.getLowestAsk({ stock: 'NUS' }).$promise);
    promises.push(Sell.getLowestAsk({ stock: 'NTU' }).$promise);

    $q.all(promises).then(function(stocks){
      $scope.lowestAsks.SMU = stocks[0].length > 0 ? stocks[0][0].price : 0;
      $scope.lowestAsks.NTU = stocks[1].length > 0 ? stocks[1][0].price : 0;
      $scope.lowestAsks.NUS = stocks[2].length > 0 ? stocks[2][0].price : 0; 
    });

    var promises = [];

    $scope.latestPrice = {};

    promises.push(Buy.getLatestPrice({ stock: 'SMU' }).$promise);
    promises.push(Buy.getLatestPrice({ stock: 'NUS' }).$promise);
    promises.push(Buy.getLatestPrice({ stock: 'NTU' }).$promise);

    $q.all(promises).then(function(stocks){
      $scope.latestPrice.SMU = stocks[0].length > 0 ? stocks[0][0].price : 0;
      $scope.latestPrice.NTU = stocks[1].length > 0 ? stocks[1][0].price : 0;
      $scope.latestPrice.NUS = stocks[2].length > 0 ? stocks[2][0].price : 0; 
    });
  });