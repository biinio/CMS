/**
 * Created by Ivan on 8/27/15.
 */
'use strict';

// Setting up route
angular.module('showcases').config(['$stateProvider',
    function($stateProvider) {
        // Users state routing
        $stateProvider.
            state('appleftbar.showcases', {
                url: '/showcases',
                templateUrl: 'modules/showcases/views/showcases.client.view.html',
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
