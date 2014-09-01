'use strict';

angular.module('applicationApp')
  .controller('MainCtrl', function ($scope, Stats, $q) {  
    var promises = [];
    promises.push(Stats.get({ stock: 'SMU' }).$promise);
    promises.push(Stats.get({ stock: 'NUS' }).$promise);
    promises.push(Stats.get({ stock: 'NTU' }).$promise);

    $q.all(promises).then(function(stocks){
      $scope.stocks = stocks;
    });
  });