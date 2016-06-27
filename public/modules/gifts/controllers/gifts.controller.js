/**=========================================================
 * Module: gifts.controller.js
 * Controller of gifts
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('gifts')
        .controller('GiftsController', GiftsController);

    GiftsController.$inject = ['$scope', 'ObjectsSidebar', 'Loading'];

    function GiftsController($scope, ObjectsSidebar, Loading) {
        var vm = this;

        $scope.objectsSidebarService = ObjectsSidebar;
        $scope.loadingService = Loading;
        $scope.loadingService.isLoading = false;
    }
})();
