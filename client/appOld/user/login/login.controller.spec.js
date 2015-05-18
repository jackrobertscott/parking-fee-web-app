'use strict';

describe('Controller: UserLoginCtrl', function () {

  // load the controller's module
  beforeEach(module('webApp'));

  var LoginCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LoginCtrl = $controller('UserLoginCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
