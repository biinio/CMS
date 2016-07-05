/**=========================================================
 * Module: gifts.controller.js
 * Controller of gifts
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('gifts')
        .controller('GiftsController', GiftsController);

    GiftsController.$inject = ['$http', '$scope', 'Loading', 'ElementsService', 'Organization', 'ObjectsSidebar'];

    function GiftsController($http, $scope, Loading, ElementsService, Organization, ObjectsSidebar) {

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
            //Gift Object
            $scope.objectsSidebarService.selectedObject = {};
            //Default bonus period state
            $scope.objectsSidebarService.selectedObject.bonusPeriodState = '0';
            //Current Date
            $scope.currentDate = new Date();
            //Draggable Properties
            $scope.organizationId = $scope.organizationService.selectedOrganization.identifier;

            //----Functions----//
            //Get the List of Elements
            $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/readyElements/').success(function (data) {
                $scope.products = data.data.elements;
            });
        }

        $scope.init = init();
    }
})();
