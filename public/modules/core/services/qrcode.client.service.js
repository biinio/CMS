/* Qrcode Service */
(function() {
    'use strict';

    angular /*  Module getter */
        .module('app.core')
        .factory('Qrcode', ['$http', 'Organization', 'GlobalFilters', Qrcode]);

    function Qrcode($http, Organization, GlobalFilters) {
        /* Function to obtain the current qr code of a site */
        function getCurrentQr(site) {
            var selectedOrganizationId = Organization.selectedOrganizationId;

            return $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + selectedOrganizationId + '/sites/' + site + '/getqrcode').then(function (response) {
                return response.data;
            });
        }

        return {
            getCurrentQr: getCurrentQr
        };
    }  /* Qrcode function ends */
})();
