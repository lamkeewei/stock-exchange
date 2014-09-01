'use strict';

angular.module('applicationApp')
  .controller('EndCtrl', function ($scope, Buy, Sell, $q, $window) {
    $scope.endTradingDay = function(){
      var promises = [];
      promises.push(Buy.deleteAll().$promise);
      promises.push(Sell.deleteAll().$promise);

      $q.all(promises);        
    };

    $scope.endTradingDay();
  });
