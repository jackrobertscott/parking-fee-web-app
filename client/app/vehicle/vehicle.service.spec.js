'use strict';

describe('Service: Vehicle', function () {

  // load the service's module
  beforeEach(module('webApp'));

  // instantiate service
  var vehicle;
  beforeEach(inject(function (_vehicle_) {
    vehicle = _vehicle_;
  }));

  it('should do something', function () {
    expect(!!vehicle).toBe(true);
  });

});
