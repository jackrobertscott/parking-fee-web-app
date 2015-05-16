'use strict';

describe('Controller: UserSettingsCtrl', function () {

  // load the controller's module
  beforeEach(module('webApp'));

  var SettingsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SettingsCtrl = $controller('UserSettingsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
