//Users Service
(function() {
    'use strict';

    angular /*  Module getter */
        .module('users')
        .factory('UsersOrg', ['$http','Organization', '$translate', 'toaster', UsersService]);

    function UsersService($http, Organization, $translate, toaster) {
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

        /* Function to invite a new user to the organization */
        function invite(userToInvite) {
            var user = {};
            var translateText = $translate.instant(['USER.INVITE_SUCCESS', 'USER.INVITE_ERROR']);

            user.displayName = userToInvite.displayName;
            user.lastName = userToInvite.lastName;
            user.email = userToInvite.email;
            user.organizationId = Organization.selectedOrganizationId;

            return $http.post(ApplicationConfiguration.applicationBackendURL + 'api/clients/invite',user)
                .then(function (response) {
                    toaster.pop('success', '', translateText['USER.INVITE_SUCCESS']);
                    return response.data;
                },function (error) {
                    toaster.pop('error', translateText['USER.INVITE_ERROR']);
                    console.log(error);
                });
        }


        return {
            getUsers: getUsers,
            invite: invite
        };
    }  /* UsersService function ends */
})();
