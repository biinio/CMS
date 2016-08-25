/**=========================================================
 * Module: cards.client.controller.js
 * Controller of cards
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('cards')
        .controller('CardsController', CardsController);

    CardsController.$inject = ['$http', '$window', '$state',  '$scope', 'Loading', 'Organization', 'ObjectsSidebar', 'Authentication', '$translate', 'toaster'];

    function CardsController($http, $window, $state, $scope, Loading, Organization, ObjectsSidebar, Authentication, $translate, toaster) {
        var card = this;

        if (!Authentication.user) {
            $window.location = '/';
        }

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
            $scope.slotsQuantities = [10,12,14];
            //State of loading screen
            $scope.loadingService.isLoading = true;
            //Current Date
            $scope.currentDate = new Date().getTime();
            //Default alerts/hints
            $scope.show_alert = true;
            //ObjectsSidebar card template
            $scope.sidebarTemplate =
                "<div class='col-md-3 thumbListImage'>" +
                    "<img ng-if='!item.gift' src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDAiIGhlaWdodD0iMTQwIj48cmVjdCB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjcwIiB5PSI3MCIgc3R5bGU9ImZpbGw6I2FhYTtmb250LXdlaWdodDpib2xkO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtZmFtaWx5OkFyaWFsLEhlbHZldGljYSxzYW5zLXNlcmlmO2RvbWluYW50LWJhc2VsaW5lOmNlbnRyYWwiPjE0MHgxNDA8L3RleHQ+PC9zdmc+' alt=''/>" +
                    "<img ng-if='item.gift' ng-src='{{setProductImage(item.gift.productIdentifier)}}' pending-indicator='pending-indicator'/>"+
                "</div>" +
                "<div class='col-md-9 leftInformationArea'>"+
                    "<label class='twoRowTitle'>{{organizationService.selectedOrganization.name}}</label>"+
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
            //Already to show the gift info
            $scope.ready = true;
        });

        $scope.$on('organizationChanged',function(){
            $scope.organizationId = $scope.organizationService.selectedOrganization.identifier;
            $scope.loadingService.isLoading = true;
            //Get the List of Gifts
            $scope.ready = false;
            if($scope.organizationId){
                $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/cards').success(function(cards) {
                    $scope.cards = cards;
                    $scope.objectsSidebarService.setObjects($scope.cards);
                    $state.reload();
                    $scope.loadingService.isLoading = false;
                });
                //Get the List of Products
                $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/readyElements/').success(function(data) {
                    $scope.products = data.data.elements;
                });
                //Get the List of Gifts
                $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/gifts').success(function(gifts) {
                    getAvailableGifts(gifts);
                });
            }
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
            //Get the List of Gifts
            $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/gifts').success(function(gifts) {
                getAvailableGifts(gifts);
            });
        }

        //Create a card
        $scope.create = function(){
            var titleText = $translate.instant("CARD.CREATING");
            swal({   title: titleText,  type: "info",   showConfirmButton: false });
            $http.post(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/cards').success(function(card,status){
                if(status == 201){
                    var cards = $scope.objectsSidebarService.getObjects();
                    cards.unshift(card);
                    $scope.objectsSidebarService.setObjects(cards);
                    $scope.objectsSidebarService.setSelectedObject(card);
                    $scope.ready = true;

                    setTimeout(function(){
                        swal.close();
                    },2000);
                }
            });
        }

        //Function that display the swal as a confirmation to remove card
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

        //Remove card at specific position
        $scope.removeCardAt = function(index){
            var cardToDelete = $scope.objectsSidebarService.objects[index];
            var translatedTexts  = $translate.instant(["CARD.DELETED_TEXT","GENERIC.DELETED"]);
            $http.delete(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/cards/'+ cardToDelete.identifier,{data:cardToDelete}).success(function(data){
                    $scope.ready = false;
                    $scope.objectsSidebarService.objects.splice(index,1);
                    swal(translatedTexts["GENERIC.DELETED"], translatedTexts["CARD.DELETED_TEXT"], "success");
                }
            );
        };
        
        //Save gift information
        $scope.update = function(){
            var cardToUpdate = $scope.objectsSidebarService.selectedObject;
            cardToUpdate.conditionsText = 'Al hacer tap en OK aceptas las condiciones de uso de la tarjeta de cliente frecuente de ' + $scope.organizationService.selectedOrganization.name + '.'
            // Don't do anything if there is no selected card
            if ($scope.ready == false)
                return;

            if(card.myForm.$valid && ($scope.objectsSidebarService.selectedObject.conditionsText || $scope.objectsSidebarService.selectedObject.conditionsURL)) {
                $http.put(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/cards/'+ cardToUpdate.identifier,cardToUpdate).success(function(data,status){
                    console.log('Actualizado');
                });
            }
        }

        //Function to activate a card
        $scope.activate = function () {
            var isOneActive = false;
            var isActive = $scope.objectsSidebarService.selectedObject.isActive;

            //Check if there is a card active
            for(var i in $scope.cards){
                if($scope.cards[i].isActive==true){
                    isOneActive = true;
                }
            }

            if(isOneActive && !isActive){
                toaster.pop('warning', 'Solo puede haber una tarjeta activa');
            } else {
                var cardToUpdate = $scope.objectsSidebarService.selectedObject;
                //Activate card
                if(card.myForm.$valid && !isActive) {
                    var translatedTexts  = $translate.instant(["GENERIC.ACTIVATE_CARD_TITLE","GENERIC.ACTIVATE_CARD_CONFIRMATION","GENERIC.ACTIVATE","GENERIC.CANCEL","GENERIC.ACTIVATED","CARD.ACTIVATE_TEXT"]);
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

                        $http.put(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/cards/'+cardToUpdate.identifier,{isActive:true}).success(function(data,status){
                            swal(translatedTexts["GENERIC.ACTIVATED"], translatedTexts["CARD.ACTIVATE_TEXT"], "success");
                        });
                    });
                }
                //Deactivate card
                if(isActive){
                    var translatedTexts  = $translate.instant(["GENERIC.DEACTIVATE_CARD_TITLE","GENERIC.DEACTIVATE_CARD_CONFIRMATION","GENERIC.DEACTIVATE","GENERIC.CANCEL","GENERIC.DEACTIVATED","CARD.DEACTIVATE_TEXT"]);
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

                        $http.put(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/cards/'+cardToUpdate.identifier,{isActive:false}).success(function(data,status){
                            swal(translatedTexts["GENERIC.DEACTIVATED"], translatedTexts["CARD.DEACTIVATE_TEXT"], "success");
                        });
                    });
                }
            }
        }
        //Function to remove expire and spent gifts
        function getAvailableGifts(gifts) {
            console.log(gifts);
            $scope.gifts = [];
            for(var i in gifts){
                gifts[i].endDate = new Date();
                if((gifts[i].amount > gifts[i].amountSpent && $scope.currentDate < gifts[i].endDate.getTime()) || (gifts[i].amount ==-1 && $scope.currentDate < gifts[i].endDate.getTime())){
                   $scope.gifts.push(gifts[i]);
                }
            }
        }
        //Define a display number for quantity
        $scope.checkUnlimited = function() {
            $scope.objectsSidebarService.selectedObject.quantity = 1;
        }
    }
})();
