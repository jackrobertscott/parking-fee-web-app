'use strict';

describe('Controller: LocationOverviewCtrl', function () {

  // load the controller's module
  beforeEach(module('webApp'));

  var OverviewCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OverviewCtrl = $controller('LocationOverviewCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
