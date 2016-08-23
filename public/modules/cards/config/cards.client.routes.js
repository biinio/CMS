/**
 * Created by Carlos on 7/28/15.
 */
'use strict';

// Setting up route
angular.module('cards').config(['$stateProvider',
    function($stateProvider) {
        // Users state routing
        $stateProvider.
        state('app.cards', {
            url: '/cards',
            templateUrl: 'modules/cards/views/cards.client.view.html',
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
