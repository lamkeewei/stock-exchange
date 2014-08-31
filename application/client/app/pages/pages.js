'use strict';

angular.module('applicationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.pages', {
        url: 'pages',
        controller: 'PagesCtrl',
        views: {
          'content@': {
            templateUrl: 'app/pages/pages.html'
          }
        }
      })
      .state('main.pages.one', {
        url: '/1',
        templateUrl: 'app/pages/static-pages/static1.html'
      })
      .state('main.pages.two', {
        url: '/2',
        templateUrl: 'app/pages/static-pages/static2.html'
      })
      .state('main.pages.three', {
        url: '/3',
        templateUrl: 'app/pages/static-pages/static3.html'
      })
      .state('main.pages.four', {
        url: '/4',
        templateUrl: 'app/pages/static-pages/static4.html'
      })
      .state('main.pages.five', {
        url: '/5',
        templateUrl: 'app/pages/static-pages/static5.html'
      })
      .state('main.pages.six', {
        url: '/6',
        templateUrl: 'app/pages/static-pages/static6.html'
      });
  });