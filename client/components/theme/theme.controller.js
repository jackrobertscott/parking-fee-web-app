'use strict';

angular.module('webApp')
  .controller('ThemeCtrl', function ($scope, $state, Auth) {
    $scope.menu = [{
      name: 'Home',
      href: '/',
      isLoggedIn: false,
      isLoggedOut: false,
      minRole: 'guest'
    }, {}];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $state.go('/login');
    };

    $scope.isActive = function(route) {
      return $state.is(route);
    };
  });
