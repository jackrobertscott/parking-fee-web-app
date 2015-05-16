'use strict';

describe('Service: locationCurator', function () {

  // load the service's module
  beforeEach(module('webApp'));

  // instantiate service
  var locationCurator;
  beforeEach(inject(function (_locationCurator_) {
    locationCurator = _locationCurator_;
  }));

  it('should do something', function () {
    expect(!!locationCurator).toBe(true);
  });

});
