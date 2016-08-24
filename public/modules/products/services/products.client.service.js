//Products Service
(function() {
    'use strict';

    angular /*  Module getter */
        .module('dashboard')
        .factory('Products', ['$http', ProductsService]);

    function ProductsService() {
        /*Function to obtain the image of a product
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
        return {
            getImage: getImage
        };
    }  /*  DashboardService function ends */
})();
