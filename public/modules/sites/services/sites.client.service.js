//Sites Service
(function() {
    'use strict';

    angular /*  Module getter */
        .module('sites')
        .factory('Sites', ['$http','Organization', SitesService]);

    function SitesService($http, Organization) {
        /* Function to obtain the sites of an organization */
        function getSites() {
            var currentOrganization = Organization.selectedOrganizationId;

            return $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + currentOrganization + '/sites')
                .then(function (response) {
                    return response.data;
                },function (error) {
                    console.log(error);
                });
        }

        return {
            getSites: getSites
        };
    }  /* SitesService function ends */
})();
