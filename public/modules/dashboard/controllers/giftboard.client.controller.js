/**=========================================================
 * Module: giftboard.client.controller.js
 * giftboard for Biin in dashboard
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('dashboard')
        .controller('giftboardController', giftboardController);

    giftboardController.$inject = ['$scope', 'Organization', '$http', 'toaster', '$timeout'];

    function giftboardController($scope, Organization, $http, toaster, $timeout){
        var giftboard = this;
        $scope.isLoading = true;

        init();

        function init(){
            /* Initial Settings */
            $scope.selectedOrganizationId = Organization.selectedOrganizationId;
            /* Check if an items had been dragged */
            $scope.itemDragged = false;
            $scope.items = null;
            getGiftBoardData();
        }

        /**=============================================================================================================
         * Events Listeners
         *
         =============================================================================================================*/

        $scope.$on('organizationChanged', function () {
            $timeout.cancel($scope.giftBoardTimeout);
            getGiftBoardData();
        });

        $scope.$on('Biin: Site Changed', function (scope, site) {
            $timeout.cancel($scope.giftBoardTimeout);
            getGiftBoardData();
        });

        $scope.$on('Biin: Days Range Changed', function (scope, numberdays) {
            $timeout.cancel($scope.giftBoardTimeout);
            getGiftBoardData();
        });

        $scope.$on('$locationChangeStart', function(){
            $timeout.cancel($scope.giftBoardTimeout);
        });

        //Get the information need it for the giftboard
        function getGiftBoardData(){
            $scope.isLoading = true;

            //Get products to update gifts images
            $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.selectedOrganizationId + '/readyElements/')
                .success(function (data) {
                    $scope.products = data.data.elements;
                });

            getGiftsData();
        }
        //Get the gifts information
        function getGiftsData() {
            if($scope.selectedOrganizationId){
                //Getting the information
                $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.selectedOrganizationId + '/dashboard')
                    .success(function (data) {
                        if($scope.itemDragged==false){
                            generateDisplayInfo(data);
                        }
                    });
            }
        }
        //Function to parse the information to what we need to display
        function generateDisplayInfo(data) {
            $scope.itemsBase = [
                {'name': 'Enviados','status':'SENT','gifts':[],'allowedTypes':[]},
                {'name': 'Reclamados','status':'CLAIMED','gifts':[],'allowedTypes':['SENT','SHARED']},
                {'name': 'Entregados','status':'DELIVERED','gifts':[],'allowedTypes':['CLAIMED']}
            ];

            if (Array.isArray(data)) {
                for(var i in data){
                    var newItem = {};
                    var currentStatus = data[i].status;
                    var list;
                    if(currentStatus === 'SHARED'){
                        list = _.find($scope.itemsBase, function(o) {return o.status === 'SENT';});
                    } else{
                        list = _.find($scope.itemsBase, function(o) {return o.status === currentStatus;});
                    }

                    //If status is REFUSED nothing happens
                    if(list){
                        newItem.lastname = data[i].user.lastName;
                        newItem.name = data[i].user.firstName;
                        newItem.email = data[i].user.email;
                        newItem.productIdentifier = data[i].gift.productIdentifier;
                        newItem.recievedDate = data[i].recievedDate;
                        newItem.claimedDate = data[i].claimedDate;
                        newItem.deliveredDate = data[i].deliveredDate;
                        newItem.status = data[i].status;
                        newItem.identifier = data[i].identifier;

                        //Setting the image URL
                        var imageURL = "";

                        if( data[i].user && data[i].user.facebookAvatarUrl && data[i].user.facebookAvatarUrl != ""){
                            imageURL = data[i].user.facebookAvatarUrl;
                        } else if(data[i].user &&  data[i].user.url && data[i].user.url != "" ){
                            imageURL = data[i].user.url;
                        } else {
                            imageURL = 'modules/core/img/icons/maleAvatar.png';
                        }
                        newItem.image = imageURL;
                        //Pushing the object
                        list.gifts.push(newItem);
                    }
                }
                if(!$scope.items){
                    $scope.items = $scope.itemsBase;
                } else {
                    if(angular.toJson($scope.items) !== angular.toJson($scope.itemsBase)) {
                        $scope.items = angular.copy($scope.itemsBase);
                        console.log('Hubo un cambio');
                    }
                }

            }
            refreshingData();
        }
        //Function to refresh data every 2 second
        function refreshingData() {
            $scope.giftBoardTimeout = $timeout(function(){
                getGiftsData();
                $scope.isLoading = false;
            },1500)
        }
        //Function triggered when a gift was dropped
        $scope.itemInserted = function(event, type) {
            var target = event.path[1].getAttribute('data-status');
            $scope.itemDragged = false;

            if(type === 'SENT' && target == 'CLAIMED') {
                $http.post(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.selectedOrganizationId + '/dashboard/gift/' + $scope.dragGift + '/claim')
                    .success(function (data) {
                        getGiftsData();
                        toaster.pop('success', '', 'El regalo se ha enviado exitosamente');
                    });
            } else if(type === 'CLAIMED' && target === 'DELIVERED') {
                $http.post(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.selectedOrganizationId + '/dashboard/gift/' + $scope.dragGift + '/deliver')
                    .success(function (data) {
                        getGiftsData();
                        toaster.pop('success', '', 'El regalo ha sido entregado exitosamente');
                    });
            }
        };
        //Function triggered when a gift start dragging
        $scope.dragStart = function(gift) {
            $scope.itemDragged = true;
            $timeout.cancel($scope.giftBoardTimeout);
            $scope.dragGift = gift.identifier;
        }
        //Function triggered when a gift stop dragging
        $scope.dragCanceled = function() {
            refreshingData();
            $scope.itemDragged = false;
        }
        //Function to set the image of the current product into the thumbnail in the Objects Sidebar
        $scope.setProductName = function (product) {
            for(var i in $scope.products){
                if(product == $scope.products[i].elementIdentifier){
                    return $scope.products[i].title;
                }
            }
        };
    }
})();
