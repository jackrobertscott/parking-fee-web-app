'use strict';

describe('Service: userCurator', function () {

  // load the service's module
  beforeEach(module('webApp'));

  // instantiate service
  var userCurator;
  beforeEach(inject(function (_userCurator_) {
    userCurator = _userCurator_;
  }));

  it('should do something', function () {
    expect(!!userCurator).toBe(true);
  });

});
