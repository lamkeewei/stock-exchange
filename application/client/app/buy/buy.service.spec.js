'use strict';

describe('Service: buy', function () {

  // load the service's module
  beforeEach(module('applicationApp'));

  // instantiate service
  var buy;
  beforeEach(inject(function (_buy_) {
    buy = _buy_;
  }));

  it('should do something', function () {
    expect(!!buy).toBe(true);
  });

});
