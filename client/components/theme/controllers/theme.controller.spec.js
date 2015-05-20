'use strict';

describe('Controller: ThemeCtrl', function () {

  // load the controller's module
  beforeEach(module('webApp'));

  var ThemeCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ThemeCtrl = $controller('ThemeCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
