'use strict';

describe('Service: companyCurator', function () {

  // load the service's module
  beforeEach(module('webApp'));

  // instantiate service
  var companyCurator;
  beforeEach(inject(function (_companyCurator_) {
    companyCurator = _companyCurator_;
  }));

  it('should do something', function () {
    expect(!!companyCurator).toBe(true);
  });

});
