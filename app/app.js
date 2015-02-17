var lipApp = angular.module('lipApp', []);

    lipApp.controller('navController', function ($scope) {

      $scope.openNav = function() {
        console.log('Hello');
      }

      $scope.closeNav = function() {
        console.log('Bye');
      }

});