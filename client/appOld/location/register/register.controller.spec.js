'use strict';

describe('Controller: LocationRegisterCtrl', function () {

  // load the controller's module
  beforeEach(module('webApp'));

  var RegisterCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RegisterCtrl = $controller('LocationRegisterCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
