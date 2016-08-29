/* Qrcode Service */
(function() {
    'use strict';

    angular /*  Module getter */
        .module('app.core')
        .factory('Qrcode', ['$http', 'Organization', 'GlobalFilters', Qrcode]);

    function Qrcode($http, Organization, GlobalFilters) {
        var globalFiltersService = GlobalFilters;
        var selectedOrganizationId = Organization.selectedOrganizationId;;
        
        /* Function to obtain the current qr code of a site */
        function getCurrentQr() {
            return $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + selectedOrganizationId + '/sites/' + globalFiltersService.selectedSite.identifier + '/getqrcode').then(function (response) {
                return response.data;
            });
        }

        return {
            getCurrentQr: getCurrentQr
        };
    }  /* Qrcode function ends */
})();
