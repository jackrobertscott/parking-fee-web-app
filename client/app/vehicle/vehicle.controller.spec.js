'use strict';

describe('Controller: VehicleCtrl', function () {

  // load the controller's module
  beforeEach(module('webApp'));

  var VehicleCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VehicleCtrl = $controller('VehicleCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
