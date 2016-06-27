/**
 * Created by Carlos on 6/27/15.
 */
'use strict';

// Setting up route
angular.module('gifts').config(['$stateProvider',
    function($stateProvider) {
        // Users state routing
        $stateProvider.
        state('app.gifts', {
            url: '/gifts',
            templateUrl: 'modules/gifts/views/gifts.client.view.html',
            resolve:{
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