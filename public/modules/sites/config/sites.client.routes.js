/**
 * Created by Ivan on 8/27/15.
 */
'use strict';

// Setting up route
angular.module('sites').config(['$stateProvider',
    function($stateProvider) {
        // Users state routing
        $stateProvider.
            state('app.sites', {
                url: '/sites',
                templateUrl: 'modules/sites/views/sites.client.view.html',
                resolve: {
                    permissions: function(Permission) {
                        return Permission.getPermissions();
                    },
                    selectedOrganization: function (Organization) {
                        return Organization.getSelectedOrganization();
                    },
                    organization: function (Organization) {
                        return Organization.getOrganizations();
                    }
                }
            });
    }
]);
