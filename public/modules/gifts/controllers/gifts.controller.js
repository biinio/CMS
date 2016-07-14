/**=========================================================
 * Module: gifts.controller.js
 * Controller of gifts
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('gifts')
        .controller('GiftsController', GiftsController);

    GiftsController.$inject = ['$http', '$state', '$scope', 'Loading', 'Organization', 'ObjectsSidebar', 'Authentication', '$translate'];

    function GiftsController($http, $state, $scope, Loading, Organization, ObjectsSidebar, Authentication, $translate) {
        var giftCtrl = this;

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
            //Objects Sidebar Service
            $scope.objectsSidebarService = ObjectsSidebar;
            //Authentication Service
            $scope.authentication = Authentication;

            //----Variables----//
            //Ready to fill
            $scope.ready = false;
            $scope.products = [];
            $scope.gifts = [];
            $scope.sites = [];
            //State of loading screen
            $scope.loadingService.isLoading = true;
            //Gift Object
            $scope.objectsSidebarService.selectedObject = {};
            //Current Date
            $scope.currentDate = new Date();
            //Default alerts
            $scope.show_alert = true;
            //Draggable Properties
            $scope.organizationId = $scope.organizationService.selectedOrganization.identifier;
            $scope.sidebarTemplate =
                "<div class='col-md-3 thumbListImage'>" +
                    "<img ng-if='item.productIdentifier.length==0' src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDAiIGhlaWdodD0iMTQwIj48cmVjdCB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjcwIiB5PSI3MCIgc3R5bGU9ImZpbGw6I2FhYTtmb250LXdlaWdodDpib2xkO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtZmFtaWx5OkFyaWFsLEhlbHZldGljYSxzYW5zLXNlcmlmO2RvbWluYW50LWJhc2VsaW5lOmNlbnRyYWwiPjE0MHgxNDA8L3RleHQ+PC9zdmc+' alt=''/>" +
                    "<img ng-if='item.productIdentifier.length>0' ng-src='{{setProductImage(item.productIdentifier)}}' pending-indicator='pending-indicator'/>"+
                "</div>" +
                "<div class='col-md-9 leftInformationArea'>"+
                    "<label class='twoRowTitle'>{{item.name}}</label>"+
                    "<small ng-if='item.amount>item.amountSpent && item.hasAvailablePeriod==false || item.amount>item.amountSpent && ((currentDate | date) <= (item.endDate | date)) && item.hasAvailablePeriod==true' class='valid-color'>Disponible</small>"+
                    "<small ng-if='item.amount==item.amountSpent && item.hasAvailablePeriod==false || item.amount==item.amountSpent && ((currentDate |date) <= (item.endDate | date)) && item.hasAvailablePeriod==true' class='invalid-color'>Agotado</small>"+
                    "<small ng-if='((currentDate | date) > (item.endDate | date)) && item.hasAvailablePeriod==true' class='invalid-color'>Vencido</small>"+
                "</div>";
            $scope.objectsSidebarService.template =$scope.sidebarTemplate;
            //----Functions----//
            //Get the List of Products
            $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/readyElements/').success(function(data) {
                $scope.products = data.data.elements;
            });
            //Get the List of Sites
            $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/'+ $scope.organizationId +'/sites').success(function(data){
                $scope.locals = data.data.sites;
            });
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
            //Parsing dates to work on AngularJS
            objectClicked.startDate = new Date(objectClicked.startDate);
            objectClicked.endDate = new Date(objectClicked.endDate);
            //All ready to show the gift info
            $scope.ready = true;
        });
        $scope.$on('organizationChanged',function(){
            $scope.organizationId = $scope.organizationService.selectedOrganization.identifier;
            $scope.loadingService.isLoading = true;
            //Get the List of Gifts
            $scope.ready = false;
            $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/gifts').success(function(gifts) {
                $scope.gifts = gifts;
                $scope.objectsSidebarService.setObjects($scope.gifts);
                $state.reload();
                $scope.loadingService.isLoading = false;
            });
            //Get the List of Products
            $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/readyElements/').success(function(data) {
                $scope.products = data.data.elements;
            });
            //Get the List of Sites
            $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/'+ $scope.organizationId +'/sites').success(function(data){
                $scope.locals = data.data.sites;
            });
        });

        /**=============================================================================================================
         * Functions
         =============================================================================================================*/

        //Get the List of Gifts
        $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/gifts').success(function(gifts) {
            $scope.gifts = gifts;
            $scope.objectsSidebarService.setObjects($scope.gifts);
            $scope.loadingService.isLoading = false;
        });

        //Create a gift
        $scope.create = function(){
            var titleText = $translate.instant("GIFT.CREATING");
            swal({   title: titleText,  type: "info",   showConfirmButton: false });
            $http.post(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/gifts').success(function(gift,status){
                if(status == 201){
                    var gifts = $scope.objectsSidebarService.getObjects();

                    gifts.push(gift);
                    $scope.objectsSidebarService.setObjects(gifts);
                    $scope.objectsSidebarService.setSelectedObject(gift);

                    setTimeout(function(){
                        swal.close();
                    },2000);
                }
            });
        }

        //Function to send just the available types of gift mechanics
        $scope.availableIn = function (type) {
            var exist = false;
            $scope.types = $scope.objectsSidebarService.selectedObject.availableIn;

            if($scope.types.length == 0){
                $scope.types.push(type);
            }else{
                //Validate if the option was already selected
                for(var i in $scope.types){
                    if(type == $scope.types[i]){
                        $scope.types.splice(i, 1);
                        exist = true;
                    }
                }
                if(!exist){
                    if(type == 'all'){
                        $scope.types = ['all'];
                    }else{
                        //Validate if you have all and select another option
                        for(var i in $scope.types){
                            if($scope.types[i] == 'all'){
                                $scope.types.splice(i, 1);
                            }
                        }
                        $scope.types.push(type);
                        //Validate if all option are selected
                        if($scope.types.length == 3){
                            $scope.types = ['all'];
                        }
                    }
                }
            }
            $scope.objectsSidebarService.selectedObject.availableIn = $scope.types;
        }

        //Function to control the locals available for the gift
        $scope.availableLocal = function (local) {
            var exist = false;
            $scope.localsAvailable = $scope.objectsSidebarService.selectedObject.sites;

            if($scope.localsAvailable.length == 0){
                 $scope.localsAvailable.push(local);
            }else{
                 //Validate if the local was already selected
                for(var i in $scope.localsAvailable){
                    if(local == $scope.localsAvailable[i]){
                        $scope.localsAvailable.splice(i, 1);
                        exist = true;
                    }
                }
                if(!exist){
                    $scope.localsAvailable.push(local);
                }
            }
            $scope.objectsSidebarService.selectedObject.sites = $scope.localsAvailable;
        }

        //Function to activate a gift
        $scope.activate = function () {
            if($scope.objectsSidebarService.selectedObject.amountSpent == 0 && $scope.objectsSidebarService.selectedObject.isActive == false){
                $scope.objectsSidebarService.selectedObject.isActive = true;
            }else if($scope.objectsSidebarService.selectedObject.amountSpent == 0 && $scope.objectsSidebarService.selectedObject.isActive == true){
                $scope.objectsSidebarService.selectedObject.isActive = false;
            }
            if($scope.objectsSidebarService.selectedObject.amountSpent > 0){
                console.log('No puede realizar esta acción, porque el regalo ya fue reclamado');
            }
        }

        //Function that display the swal as a confirmation to remove gift
        $scope.deleteGift = function(message, selectedObject) {
            var translatedTexts  = $translate.instant(["GENERIC.DELETE_GIFT_TITLE","GENERIC.DELETE_GIFT_CONFIRMATION","GENERIC.DELETE","GENERIC.CANCEL"]);

            swal({
                title: translatedTexts["GENERIC.DELETE_GIFT_TITLE"],
                text: translatedTexts["GENERIC.DELETE_GIFT_CONFIRMATION"],
                type: "warning",
                showCancelButton: true,
                cancelButtonText:translatedTexts["GENERIC.CANCEL"],
                confirmButtonColor: "#DD6B55",
                confirmButtonText: translatedTexts["GENERIC.DELETE"],
                showLoaderOnConfirm: true,
                closeOnConfirm: false
            }, function () {
                if($scope.objectsSidebarService.selectedObject.amountSpent == 0) {
                    $scope.removeGiftAt($scope.objectsSidebarService.objects.indexOf(selectedObject));
                }
            });
        };

        //Remove element at specific position
        $scope.removeGiftAt = function(index){
            var giftToDelete = $scope.objectsSidebarService.objects[index];
            var translatedTexts  = $translate.instant(["ELEMENT.DELETED_TEXT","GENERIC.DELETED"]);
            $http.delete(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/gifts/'+giftToDelete.identifier,{data:giftToDelete}).success(function(data){
                    $scope.ready = false;
                    $scope.objectsSidebarService.objects.splice(index,1);
                    swal(translatedTexts["GENERIC.DELETED"], translatedTexts["ELEMENT.DELETED_TEXT"], "success");
                }
            );
        };

        //Save gift information
        $scope.update = function(){
            var giftToUpdate = $scope.objectsSidebarService.selectedObject;
            // Don't do anything if there is no selected gift
            if ($scope.ready == false)
                return;

            if(giftCtrl.myForm.$valid  && $scope.objectsSidebarService.selectedObject.sites.length > 0 && $scope.objectsSidebarService.selectedObject.availableIn.length > 0) {
                $http.put(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/gifts/'+giftToUpdate.identifier,giftToUpdate).success(function(data,status){
                    console.log('Actualizado');
                });
            }
        }
        //Check locals in initial data
        $scope.checkLocal = function(local){
            $scope.localsAvailable = $scope.objectsSidebarService.selectedObject.sites;
            for(var i in $scope.localsAvailable){
                if(local == $scope.localsAvailable[i]){
                    return true;
                }
            }
        }
    }
})();
