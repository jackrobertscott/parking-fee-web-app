'use strict';

describe('Controller: CompanyAdminCtrl', function () {

  // load the controller's module
  beforeEach(module('webApp'));

  var AdminCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminCtrl = $controller('CompanyAdminCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
