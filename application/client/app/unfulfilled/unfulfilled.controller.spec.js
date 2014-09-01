'use strict';

describe('Controller: UnfulfilledCtrl', function () {

  // load the controller's module
  beforeEach(module('applicationApp'));

  var UnfulfilledCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UnfulfilledCtrl = $controller('UnfulfilledCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
