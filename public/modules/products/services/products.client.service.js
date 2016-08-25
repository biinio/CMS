//Products Service
(function() {
    'use strict';

    angular /*  Module getter */
        .module('dashboard')
        .factory('Products', ['$http','Organization', ProductsService]);

    function ProductsService($http, Organization) {
       /* Function to obtain the image of a product
        * @param type: [], productIdentifier
        * @param type: string, productIdentifier
        */
        function getImage(product, products) {
            for(var i in products){
                if(products[i].elementIdentifier === product){
                    return products[i].media[0].url;
                }
            }
        }
        /* Function to obtain the ready products */
        function getReadyProducts() {
            var currentOrganization = Organization.selectedOrganization.identifier;

            return $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + currentOrganization + '/readyElements/')
            .then(function (response) {
                return response.data;
            },function (error) {
                console.log(error);
            });
        }


        return {
            getImage: getImage,
            getReadyProducts: getReadyProducts
        };
    }  /*  DashboardService function ends */
})();
