/**
 * Created by sofi on 10/6/15.
 */
'use strict';

// Setting up route
angular.module('maintenance').config(['$stateProvider',
    function($stateProvider) {
        // Users state routing
        $stateProvider.
            state('app.maintenance', {
                url: '/maintenance',
                templateUrl: 'modules/maintenance/views/maintenance.client.view.html',
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
