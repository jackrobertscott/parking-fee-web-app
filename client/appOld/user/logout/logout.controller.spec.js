'use strict';

describe('Controller: UserLogoutCtrl', function () {

  // load the controller's module
  beforeEach(module('webApp'));

  var LogoutCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LogoutCtrl = $controller('UserLogoutCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
