'use strict';

describe('Controller: SellCtrl', function () {

  // load the controller's module
  beforeEach(module('applicationApp'));

  var SellCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SellCtrl = $controller('SellCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
