'use strict';

describe('Service: vehicleCurator', function () {

  // load the service's module
  beforeEach(module('webApp'));

  // instantiate service
  var vehicleCurator;
  beforeEach(inject(function (_vehicleCurator_) {
    vehicleCurator = _vehicleCurator_;
  }));

  it('should do something', function () {
    expect(!!vehicleCurator).toBe(true);
  });

});
