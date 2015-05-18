'use strict';

describe('Controller: VehicleUserCtrl', function () {

  // load the controller's module
  beforeEach(module('webApp'));

  var UserCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserCtrl = $controller('VehicleUserCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
