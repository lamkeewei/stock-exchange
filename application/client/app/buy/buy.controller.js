'use strict';

angular.module('applicationApp')
  .controller('BuyCtrl', function ($scope, $rootScope, $window, Buy) {    
    $scope.bid = {
      userId: $rootScope.user && $rootScope.user.username      
    };

    $scope.submitBid = function(form){      
      $scope.submitted = true;

      if (form.$valid) {
        Buy.save($scope.bid, function(data){
          console.log(data);

          if (data.status === 'success') {
            new $window.PNotify({
              title: 'Buy Bid Success!',
              text: 'Your buy bid has been submitted successfully!',
              type: 'success'
            });          
          } else {
            new $window.PNotify({
              title: 'Buy Bid Unsuccessful!',
              text: data.status,
              type: 'error'
            });
          }          
        });

        $scope.bid = {
          userId: $rootScope.user && $rootScope.user.username
        };

        $scope.submitted = false;
      }
    };
  });
