'use strict';

describe('Controller: CompanyRegisterCtrl', function () {

  // load the controller's module
  beforeEach(module('webApp'));

  var RegisterCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RegisterCtrl = $controller('CompanyRegisterCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
