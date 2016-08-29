//Gifts Service
(function() {
    'use strict';

    angular /*  Module getter */
        .module('gifts')
        .factory('Gifts', ['$http','Organization', GiftsService]);

    function GiftsService($http, Organization) {
        /* Function to obtain the gifts */
        function getGifts() {
            var currentOrganization = Organization.selectedOrganizationId;

            return $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + currentOrganization + '/gifts')
                .then(function (response) {
                    return response.data;
                },function (error) {
                    console.log(error);
                });
        }

        /* Function to obtain available gifts */
        function getAvailableGifts() {
            var currentOrganization = Organization.selectedOrganizationId;

            return $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + currentOrganization + '/gifts')
                .then(function (response) {
                    return parseAvailableGifts(response.data);
                },function (error) {
                    console.log(error);
                });
        }

        /* Function to parse available gifts */
        function parseAvailableGifts(gifts) {
            var parseGifts = [];
            var currentDate = new Date();
            for(var i in gifts){
                gifts[i].endDate = new Date(gifts[i].endDate);
                /* This verifies if the gift is not spent and is not expired*/
                if(((gifts[i].amount > gifts[i].amountSpent || gifts[i].isUnlimited) && currentDate < gifts[i].endDate.getTime() && gifts[i].hasAvailablePeriod) || ((gifts[i].amount > gifts[i].amountSpent || gifts[i].isUnlimited) && !gifts[i].hasAvailablePeriod)){
                    parseGifts.push(gifts[i]);
                }
            }
            return parseGifts;
        }


        return {
            getGifts: getGifts,
            getAvailableGifts: getAvailableGifts
        };
    }  /*  GiftsService function ends */
})();
