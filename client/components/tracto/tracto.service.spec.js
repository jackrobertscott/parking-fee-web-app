'use strict';

describe('Service: tracto', function () {

  // load the service's module
  beforeEach(module('webApp'));

  // instantiate service
  var tracto;
  beforeEach(inject(function (_tracto_) {
    tracto = _tracto_;
  }));

  it('should do something', function () {
    expect(!!tracto).toBe(true);
  });

});
