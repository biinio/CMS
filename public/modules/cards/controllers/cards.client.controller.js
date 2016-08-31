/**=========================================================
 * Module: cards.client.controller.js
 * Controller of cards
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('cards')
        .controller('CardsController', CardsController);

    CardsController.$inject = ['$window', '$state',  '$scope', 'Loading', 'Organization', 'ObjectsSidebar', 'Authentication', '$translate', 'toaster', 'Gifts', 'Cards', 'Products', 'GlobalFilters'];

    function CardsController($window, $state, $scope, Loading, Organization, ObjectsSidebar, Authentication, $translate, toaster, Gifts, Cards, Products, GlobalFilters) {
        var card = this;

        /* Redirect to login if there is no user*/
        if (!Authentication.user) {
            $window.location = '/';
        }

        /* Running init function */
        init();

        /**=============================================================================================================
         * Init Function
         =============================================================================================================*/

        function init() {
            /* Initial Settings */
            $scope.loadingService = Loading;
            $scope.globalFiltersService = GlobalFilters;
            $scope.selectedOrganizationId = Organization.selectedOrganizationId;
            $scope.objectsSidebarService = ObjectsSidebar;
            $scope.cardsService = Cards;
            $scope.giftsService = Gifts;
            $scope.productsService = Products;

            getInitialData();

            /* Ready to fill/display the form */
            $scope.ready = false;
            $scope.slotsQuantities = [10,12,14];
            /* Default alerts/hints (Last block) */
            $scope.show_alert = true;
            /* ObjectsSidebar card template */
            $scope.sidebarTemplate =
                "<div class='col-md-3 thumbListImage'>" +
                    "<img ng-if='!item.gift' src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDAiIGhlaWdodD0iMTQwIj48cmVjdCB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjcwIiB5PSI3MCIgc3R5bGU9ImZpbGw6I2FhYTtmb250LXdlaWdodDpib2xkO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtZmFtaWx5OkFyaWFsLEhlbHZldGljYSxzYW5zLXNlcmlmO2RvbWluYW50LWJhc2VsaW5lOmNlbnRyYWwiPjE0MHgxNDA8L3RleHQ+PC9zdmc+' alt=''/>" +
                    "<img ng-if='item.gift' ng-src='{{item.gift.image}}' pending-indicator='pending-indicator'/>"+
                "</div>" +
                "<div class='col-md-9 leftInformationArea'>"+
                    "<label class='twoRowTitle'>{{item.title}}</label>"+
                    "<small>Cliente frecuente </small><label ng-if='item.isActive' class='fa fa-check-circle enlarge-icon'></label>"+
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

        $scope.$on("Biin: On Object Clicked", function (event, objectClicked) {
            /* Already to show the gift info */
            $scope.ready = true;
        });

        $scope.$on('organizationChanged',function(){
            $scope.loadingService.isLoading = true;

            /* Get data again, depending of the new organization */
            $scope.ready = false;
            if($scope.selectedOrganizationId){
                getInitialData();
            }
        });

        /**=============================================================================================================
         * Functions
         =============================================================================================================*/
        /*
         *Function to get all the initial data need it to initialization of the module
         */
        function getInitialData() {
            if($scope.selectedOrganizationId){
                $scope.isLoading = true;
                $scope.productsService.getReadyProducts().then(function(products) {
                    $scope.products = products.data.elements;
                    return $scope.cardsService.getCards();
                }).then(function(cards) {
                    $scope.cards = parseCards(cards);
                    $scope.objectsSidebarService.setObjects($scope.cards);
                    return $scope.giftsService.getAvailableGifts();
                }).then(function(gifts) {
                    $scope.gifts = gifts;
                    $scope.loadingService.isLoading = false;
                });
            }
        }

        /* Function to create a card */
        $scope.create = function(){
            var titleText = $translate.instant("CARD.CREATING");
            swal({   title: titleText,  type: "info",   showConfirmButton: false });
            $scope.cardsService.createCard().then(function(card) {
                var cards = $scope.objectsSidebarService.getObjects();
                cards.unshift(card);
                $scope.objectsSidebarService.setObjects(cards);
                $scope.objectsSidebarService.setSelectedObject(card);
                $scope.ready = true;

                setTimeout(function () {
                    swal.close();
                }, 2000);
            });
        }

        /* Function that display the swal as a confirmation to remove card */
        $scope.deleteCard = function(message, selectedObject) {
            var translatedTexts  = $translate.instant(["GENERIC.DELETE_CARD_TITLE","GENERIC.DELETE_CARD_CONFIRMATION","GENERIC.DELETE","GENERIC.CANCEL"]);

            swal({
                title: translatedTexts["GENERIC.DELETE_CARD_TITLE"],
                text: translatedTexts["GENERIC.DELETE_CARD_CONFIRMATION"],
                type: "warning",
                showCancelButton: true,
                cancelButtonText:translatedTexts["GENERIC.CANCEL"],
                confirmButtonColor: "#DD6B55",
                confirmButtonText: translatedTexts["GENERIC.DELETE"],
                showLoaderOnConfirm: true,
                closeOnConfirm: false
            }, function () {
                    $scope.removeCardAt($scope.objectsSidebarService.objects.indexOf(selectedObject));
            });
        };

        /* Remove card at specific position */
        $scope.removeCardAt = function(index){
            var cardToDelete = $scope.objectsSidebarService.objects[index];
            var translatedTexts  = $translate.instant(["CARD.DELETED_TEXT","GENERIC.DELETED"]);
            $scope.cardsService.deleteCard(cardToDelete).then(function() {
                $scope.ready = false;
                $scope.objectsSidebarService.objects.splice(index,1);
                swal(translatedTexts["GENERIC.DELETED"], translatedTexts["CARD.DELETED_TEXT"], "success");
            });
        };
        
        /* Save gift information */
        $scope.update = function(){
            /* Don't do anything if there is no selected card */
            if ($scope.ready == false)
                return;

            var cardToUpdate = $scope.objectsSidebarService.selectedObject;
            cardToUpdate.conditionsText = 'Al hacer tap en OK aceptas las condiciones de uso de la tarjeta de cliente frecuente de ' + $scope.globalFiltersService.selectedSite.title1 + '.'
            if(card.myForm.$valid && ($scope.objectsSidebarService.selectedObject.conditionsText || $scope.objectsSidebarService.selectedObject.conditionsURL)) {
                $scope.cardsService.updateCard(cardToUpdate, cardToUpdate).then(function(response) {
                    console.log('Actualizado');
                });
            }
        }

        /* Function to activate a card */
        $scope.activate = function () {
            var isOneActive = false;
            var isActive = $scope.objectsSidebarService.selectedObject.isActive;

            /* Check if there is a card active */
            for(var i in $scope.cards){
                if($scope.cards[i].isActive==true){
                    isOneActive = true;
                }
            }

            if(isOneActive && !isActive){
                toaster.pop('warning', 'Solo puede haber una tarjeta activa');
            } else {
                var cardToUpdate = $scope.objectsSidebarService.selectedObject;

                /* Activate card */
                if(card.myForm.$valid && !isActive) {
                    var translatedTexts  = $translate.instant(["GENERIC.ACTIVATE_CARD_TITLE","GENERIC.ACTIVATE_CARD_CONFIRMATION","GENERIC.ACTIVATE","GENERIC.CANCEL","GENERIC.ACTIVATED","CARD.ACTIVATE_TEXT"]);
                    var propertyToUpdate = {isActive:true};
                    swal({
                        title: translatedTexts["GENERIC.ACTIVATE_CARD_TITLE"],
                        text: translatedTexts["GENERIC.ACTIVATE_CARD_CONFIRMATION"],
                        type: "warning",
                        showCancelButton: true,
                        cancelButtonText:translatedTexts["GENERIC.CANCEL"],
                        confirmButtonColor: "#8CD4F5",
                        confirmButtonText: translatedTexts["GENERIC.ACTIVATE"],
                        showLoaderOnConfirm: true,
                        closeOnConfirm: false
                    }, function () {
                        $scope.objectsSidebarService.selectedObject.isActive = true;
                        $scope.cardsService.updateCard(cardToUpdate, propertyToUpdate).then(function() {
                            swal(translatedTexts["GENERIC.ACTIVATED"], translatedTexts["CARD.ACTIVATE_TEXT"], "success");
                        });
                    });
                }
                /*Deactivate card */
                if(isActive){
                    var translatedTexts  = $translate.instant(["GENERIC.DEACTIVATE_CARD_TITLE","GENERIC.DEACTIVATE_CARD_CONFIRMATION","GENERIC.DEACTIVATE","GENERIC.CANCEL","GENERIC.DEACTIVATED","CARD.DEACTIVATE_TEXT"]);
                    var propertyToUpdate = {isActive:false};
                    swal({
                        title: translatedTexts["GENERIC.DEACTIVATE_CARD_TITLE"],
                        text: translatedTexts["GENERIC.DEACTIVATE_CARD_CONFIRMATION"],
                        type: "warning",
                        showCancelButton: true,
                        cancelButtonText:translatedTexts["GENERIC.CANCEL"],
                        confirmButtonColor: "#8CD4F5",
                        confirmButtonText: translatedTexts["GENERIC.DEACTIVATE"],
                        showLoaderOnConfirm: true,
                        closeOnConfirm: false
                    }, function () {
                        $scope.objectsSidebarService.selectedObject.isActive = false;
                        $scope.cardsService.updateCard(cardToUpdate, propertyToUpdate).then(function() {
                            swal(translatedTexts["GENERIC.DEACTIVATED"], translatedTexts["CARD.DEACTIVATE_TEXT"], "success");
                        });
                    });
                }
            }
        }
        /* Define a display number for quantity */
        $scope.checkUnlimited = function() {
            $scope.objectsSidebarService.selectedObject.quantity = null;
        }
        /* Function to add the images to the gifts*/
        function parseCards(cards) {
            var parseCards = [];
            for(var i in cards) {
                if(cards[i].gift && cards[i].gift.productIdentifier){
                    cards[i].gift.image = $scope.productsService.getImage(cards[i].gift.productIdentifier, $scope.products);
                }
                parseCards.push(cards[i]);
            }
            return parseCards;
        }
        /* Set new Image if the product select change*/
        $scope.setNewImage = function (product) {
            $scope.objectsSidebarService.selectedObject.gift.image = $scope.productsService.getImage(product, $scope.products);
        }
    }
})();
