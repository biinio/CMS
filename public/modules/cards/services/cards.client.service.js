//Cards Service
(function() {
    'use strict';

    angular /*  Module getter */
        .module('cards')
        .factory('Cards', ['$http','Organization', CardsService]);

    function CardsService($http, Organization) {
        /* Function to obtain the cards */
        function getCards() {
            var currentOrganization = Organization.selectedOrganizationId;

            return $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + currentOrganization + '/cards')
                .then(function (response) {
                    return response.data;
                },function (error) {
                    console.log(error);
                });
        }
        /* Function to create a card */
        function createCard() {
            var currentOrganization = Organization.selectedOrganizationId;

            return $http.post(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + currentOrganization + '/cards')
                .then(function (response) {
                    return response.data;
                },function (error) {
                    console.log(error);
                });
        }
        /* Function to delete a card */
        function deleteCard(cardToDelete) {
            var currentOrganization = Organization.selectedOrganizationId;
            
            return $http.delete(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + currentOrganization  + '/cards/' + cardToDelete.identifier,{data:cardToDelete})
                .then(function (response) {
                    return response.data;
                },function (error) {
                    console.log(error);
                });
        }
        /* Function to update a card */
        function updateCard(cardToUpdate, propertyToUpdate) {
            var currentOrganization = Organization.selectedOrganizationId;

            return $http.put(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + currentOrganization  + '/cards/' + cardToUpdate.identifier,propertyToUpdate)
                .then(function (response) {
                    return response.data;
                },function (error) {
                    console.log(error);
                });
        }
        
        
        return {
            getCards: getCards,
            createCard: createCard,
            deleteCard: deleteCard,
            updateCard: updateCard
        };
    }  /* CardsService function ends */
})();
