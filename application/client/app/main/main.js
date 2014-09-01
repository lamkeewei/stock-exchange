'use strict';

angular.module('applicationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        resolve: {
          statistics: ['Stats', function(Stats){
            return Stats.get({ stock: 'SMU' }).promise;
          }]
        },        
        views: {
          'navbar': {
            controller: 'NavbarCtrl',
            templateUrl: 'components/navbar/navbar.html'
          },

          'content': {
            controller: 'MainCtrl',
            templateUrl: 'app/main/main.html',
            resolve: {
              stocks: ['Stats', '$q', function(Stats, $q){
                var promises = [];
                promises.push(Stats.get({ stock: 'SMU' }).$promise);
                promises.push(Stats.get({ stock: 'NUS' }).$promise);
                promises.push(Stats.get({ stock: 'NTU' }).$promise);

                return $q.all(promises);
              }]
            }
          }
        }
      });
  });