'use strict';

describe('Service: sell', function () {

  // load the service's module
  beforeEach(module('applicationApp'));

  // instantiate service
  var sell;
  beforeEach(inject(function (_sell_) {
    sell = _sell_;
  }));

  it('should do something', function () {
    expect(!!sell).toBe(true);
  });

});
