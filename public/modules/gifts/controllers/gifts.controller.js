/**=========================================================
 * Module: gifts.controller.js
 * Controller of gifts
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('gifts')
        .controller('GiftsController', GiftsController);

    GiftsController.$inject = ['$scope', 'Loading', 'ElementsService', 'Organization', 'ObjectsSidebar'];

    function GiftsController($scope, Loading, ElementsService, Organization, ObjectsSidebar) {

        function init() {
            //----Services needed----//
            //Loading Service
            $scope.loadingService = Loading;
            //Organization Service
            $scope.organizationService = Organization;
            //Objects Sidebar Service
            $scope.objectsSidebarService = ObjectsSidebar;

            //----Variables----//
            //State of loading screen
            $scope.elements = [];
            $scope.loadingService.isLoading = false;

            //----Functions----//
            //Get the List of Elements
            ElementsService.getList($scope.organizationService.selectedOrganization.identifier).then(function (promise) {
                $scope.products = promise.data.data.elements;
            });
        }

        $scope.init = init();
    }
})();
