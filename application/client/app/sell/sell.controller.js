'use strict';

angular.module('applicationApp')
  .controller('SellCtrl', function ($scope, $rootScope, Sell, $window) {
    $scope.bid = {
      userId: $rootScope.user && $rootScope.user.username      
    };  

    $scope.submitBid = function(form){      
      $scope.submitted = true;
      if (form.$valid) {
        Sell.save($scope.bid, function(){
          new $window.PNotify({
            title: 'Sell Offer Success!',
            text: 'Your sell offer has been submitted successfully!',
            type: 'success'
          });

          $scope.bid = {
            userId: $rootScope.user && $rootScope.user.username
          };

          $scope.submitted = false;
        });
      }
    };
  });
