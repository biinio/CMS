//Users Service
(function() {
    'use strict';

    angular /*  Module getter */
        .module('users')
        .factory('UsersOrg', ['$http','Organization', UsersService]);

    function UsersService($http, Organization) {
        /* Function to obtain the users of an organization*/
        function getUsers() {
            var currentOrganization = Organization.selectedOrganizationId;

            return $http.get(ApplicationConfiguration.applicationBackendURL + 'api/clients/organization/' + currentOrganization)
                .then(function (response) {
                    return response.data;
                },function (error) {
                    console.log(error);
                });
        }


        return {
            getUsers: getUsers
        };
    }  /* UsersService function ends */
})();
