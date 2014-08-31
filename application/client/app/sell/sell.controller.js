'use strict';

angular.module('applicationApp')
  .controller('SellCtrl', function ($scope, $rootScope) {
    $scope.bid = {
      userId: $rootScope.user && $rootScope.user.username      
    }

    $scope.submitBid = function(form){      
      $scope.submitted = true;

      if (form.$valid) {
        // Submit bid
      }
    };
  });
