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
            //ObjectsSidebar card template
            $scope.sidebarTemplate =
                "<div class='col-md-3 thumbListImage'>" +
                    "<img ng-if='!item.gift' src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDAiIGhlaWdodD0iMTQwIj48cmVjdCB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjcwIiB5PSI3MCIgc3R5bGU9ImZpbGw6I2FhYTtmb250LXdlaWdodDpib2xkO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtZmFtaWx5OkFyaWFsLEhlbHZldGljYSxzYW5zLXNlcmlmO2RvbWluYW50LWJhc2VsaW5lOmNlbnRyYWwiPjE0MHgxNDA8L3RleHQ+PC9zdmc+' alt=''/>" +
                    // "<img ng-if='item.productIdentifier.length>0' ng-src='{{setProductImage(item.productIdentifier)}}' pending-indicator='pending-indicator'/>"+
                "</div>" +
                "<div class='col-md-9 leftInformationArea'>"+
                    "<label class='twoRowTitle'>{{item.name}}</label>"+
                    "<small>Tarjeta cliente frecuente</small>"+
                "</div>";
            $scope.objectsSidebarService.template =$scope.sidebarTemplate;
        }

        /**=============================================================================================================
         * Event Listeners
         =============================================================================================================*/

        $scope.$on('$stateChangeStart', function(){
            $scope.loadingService.isLoading = true;
            $scope.objectsSidebarService.reset();
        });

        $scope.$on("Biin: On Object Created", function(){
            $scope.create();
        });

        /**=============================================================================================================
         * Functions
         =============================================================================================================*/

        if($scope.organizationId){
            //Get the List of Cards
            $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/cards').success(function(cards) {
                console.log(cards);
                $scope.cards = cards;
                $scope.objectsSidebarService.setObjects($scope.cards);
                $scope.loadingService.isLoading = false;
            });
        }

        //Create a card
        $scope.create = function(){
            var titleText = $translate.instant("GIFT.CREATING");
            swal({   title: titleText,  type: "info",   showConfirmButton: false });
            $http.post(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/cards').success(function(card,status){
                console.log(card);
                console.log(status);
                // if(status == 201){
                //     var cards = $scope.objectsSidebarService.getObjects();
                //     cards.push(gift);
                //     $scope.objectsSidebarService.setObjects(cards);
                //     $scope.objectsSidebarService.setSelectedObject(card);
                //
                //     setTimeout(function(){
                //         swal.close();
                //     },2000);
                // }
            });
        }
    }
})();
