angular.module('nav.app.controllers', [])
.controller('NavController', function($scope) {

    this.isOpen = false;

    this.openNav = function() {

        this.isOpen = true;

    };

    this.closeNav = function() {

        this.isOpen = false;

    };

});