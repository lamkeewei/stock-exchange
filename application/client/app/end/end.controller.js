'use strict';

angular.module('applicationApp')
  .controller('EndCtrl', function ($scope, Buy,$window) {
    $scope.endTradingDay = function(){
      Buy.endTradingDay();
    };

    $scope.endTradingDay();
  });
