//Qrcode Service
(function() {
    'use strict';

    angular /*  Module getter */
        .module('dashboard')
        .factory('Dashboard', ['$http', 'Organization', DashboardService]);

    function DashboardService($http, Organization) {
        //Function to obtain the current qr code of a site
        function getActiveCardInfo() {
            var filters = {};
            filters.organizationId = Organization.selectedOrganization.identifier;

            return $http.get(ApplicationConfiguration.applicationBackendURL + 'api/dashboard/loyaltycard/active', {
                headers: {
                    filters: JSON.stringify(filters)
                }
            }).then(function (response) {
                return response.data;
            });
        }

        return {
            getActiveCardInfo: getActiveCardInfo
        };
    }  /*  DashboardService function ends */
})();
