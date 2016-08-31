/**=========================================================
 * Module: currentCard.dashboard.client.controller.js
 * currentCard for Biin in dashboard
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('dashboard')
        .controller('currentCardController', currentCardController);

    currentCardController.$inject = ['$scope', 'Organization', 'GlobalFilters', 'Qrcode', 'Dashboard', 'Products'];

    function currentCardController($scope, Organization, GlobalFilters, Qrcode, Dashboard, Products){
        var currentCard = this;

        init();

        function init(){
            /* Initial Settings */
            $scope.organizationService = Organization;
            $scope.selectedOrganizationId = Organization.selectedOrganizationId;
            $scope.globalFiltersService = GlobalFilters;
            $scope.qrCodeService = Qrcode;
            $scope.dashboardService = Dashboard;
            $scope.productsService = Products;
            /* Getting initial Data */
            getInitialData();

            /* Functions from services */
            $scope.getImage = Products.getImage;
        }

        /**=============================================================================================================
         * Events Listeners
         *
         =============================================================================================================*/

        $scope.$on('organizationChanged', function () {
            reset();
            getInitialData();
        });

        $scope.$on('Biin: Site Changed', function (scope, site) {
            reset();
            getInitialData();
        });

        $scope.$on('Biin: Current Card Refresh', function(){
            refreshData();
        });

        /**=============================================================================================================
         * Functions
         =============================================================================================================*/
        /* Function to get all the initial data need it to initialization of the module */
        function getInitialData() {
            var site = GlobalFilters.selectedSite.identifier;

            if($scope.selectedOrganizationId){
                $scope.isLoading = true;
                $scope.qrCodeService.getCurrentQr(site).then(function(currentQR) {
                    $scope.currentQR = currentQR;
                    return $scope.productsService.getReadyProducts();
                }).then(function(products){
                    $scope.products = products.data.elements;
                    return $scope.dashboardService.getActiveCardInfo();
                }).then(function(cardData){
                    parseCardInfoData(cardData);
                });
            }
        }
        /* Function that resets some scope values */
        function reset() {
            $scope.activeCard = null;
            $scope.usersCard = [];
            $scope.products = [];
        }
        /* Function to refresh just the current Card data */
        function refreshData() {
            $scope.isLoading = true;
            $scope.dashboardService.getActiveCardInfo().then(function(cardData) {
                parseCardInfoData(cardData);
            });
        }
        /*
         * Function to parse some data information of active Card
         * param type: {}, data
         */
        function parseCardInfoData(data){
            if(data.activeCard){
                data.activeCard.image = $scope.getImage(data.activeCard.gift.productIdentifier, $scope.products);
            }
            /* Setting activeCard */
            $scope.activeCard = data.activeCard;

            if(data.usersCard){
                /* Setting the image URL */
                var imageURL = "";
                for(var i in data.usersCard){
                    if(data.usersCard[i].biinie.facebookAvatarUrl && data.usersCard[i].biinie.facebookAvatarUrl != ""){
                        imageURL = data.usersCard[i].biinie.facebookAvatarUrl;
                    } else if(data.usersCard[i].biinie.url && data.usersCard[i].biinie.url != "" ){
                        imageURL = data.usersCard[i].biinie.url;
                    } else {
                        imageURL = 'modules/core/img/icons/maleAvatar.png';
                    }
                    data.usersCard[i].image = imageURL;
                }
            }
            /* Setting usersCard */
            $scope.usersCard = data.usersCard;
            $scope.isLoading = false;
        }
    }
})();
