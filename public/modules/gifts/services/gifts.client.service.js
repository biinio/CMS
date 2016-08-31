//Gifts Service
(function() {
    'use strict';

    angular /*  Module getter */
        .module('gifts')
        .factory('Gifts', ['$http','Organization', 'GlobalFilters', GiftsService]);

    function GiftsService($http, Organization, GlobalFilters) {
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

        /* Function to obtain AutomaticGifts */
        function getAutomaticGifts() {
            var currentOrganization = Organization.selectedOrganizationId;
            var currentSite = GlobalFilters.selectedSite.identifier;

            return $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + currentOrganization + '/sites/' + currentSite + '/getavailablegifts/nps/true')
                .then(function (response) {
                    return parseAvailableGifts(response.data);
                },function (error) {
                    console.log(error);
                });
        }

        /* Function to obtain ManualGifts */
        function getManualGifts() {
            var currentOrganization = Organization.selectedOrganizationId;
            var currentSite = GlobalFilters.selectedSite.identifier;

            return $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + currentOrganization + '/sites/' + currentSite + '/getavailablegifts/nps/false')
                .then(function (response) {
                    return parseAvailableGifts(response.data);
                },function (error) {
                    console.log(error);
                });
        }

        return {
            getGifts: getGifts,
            getAvailableGifts: getAvailableGifts,
            getAutomaticGifts: getAutomaticGifts,
            getManualGifts: getManualGifts
        };
    }  /*  GiftsService function ends */
})();
