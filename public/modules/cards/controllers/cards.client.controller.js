/**=========================================================
 * Module: cards.client.controller.js
 * Controller of cards
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('cards')
        .controller('CardsController', CardsController);

    CardsController.$inject = ['$http', '$state', '$scope', 'Loading', 'Organization', 'ObjectsSidebar', 'Authentication', '$translate'];

    function CardsController($http, $state, $scope, Loading, Organization, ObjectsSidebar, Authentication, $translate) {
        var card = this;

        //Running init function
        init();

        /**=============================================================================================================
         * Init Function
         =============================================================================================================*/

        function init() {
            //----Services needed----//
            //Loading Service
            $scope.loadingService = Loading;
            //Organization Service
            $scope.organizationService = Organization;
            $scope.organizationId = $scope.organizationService.selectedOrganization.identifier;
            //Objects Sidebar Service
            $scope.objectsSidebarService = ObjectsSidebar;
            //Authentication Service
            $scope.authentication = Authentication;
            //Card Object
            $scope.objectsSidebarService.selectedObject = {};
            //----Variables----//
            //Ready to fill
            $scope.ready = false;
            $scope.cards = [];
            //State of loading screen
            $scope.loadingService.isLoading = true;
        }

        /**=============================================================================================================
         * Event Listeners
         =============================================================================================================*/

        /**=============================================================================================================
         * Functions
         =============================================================================================================*/

        if($scope.organizationId){
            //Get the List of Cards
            $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/cards').success(function(cards) {
                $scope.cards = cards;
                $scope.objectsSidebarService.setObjects($scope.cards);
                $scope.loadingService.isLoading = false;
            });
        }
    }
})();
