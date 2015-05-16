'use strict';

describe('Controller: VehicleOverviewCtrl', function () {

  // load the controller's module
  beforeEach(module('webApp'));

  var OverviewCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OverviewCtrl = $controller('VehicleOverviewCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
