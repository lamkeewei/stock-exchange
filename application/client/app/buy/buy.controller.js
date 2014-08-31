'use strict';

angular.module('applicationApp')
  .controller('BuyCtrl', function ($scope, $rootScope) {    
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
