'use strict';

describe('Controller: LocationCompanyCtrl', function () {

  // load the controller's module
  beforeEach(module('webApp'));

  var CompanyCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CompanyCtrl = $controller('LocationCompanyCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
