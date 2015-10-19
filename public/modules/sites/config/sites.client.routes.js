/**
 * Created by Ivan on 8/27/15.
 */
'use strict';

// Setting up route
angular.module('sites').config(['$stateProvider',
    function($stateProvider) {
        // Users state routing
        $stateProvider.
            state('appleftbar.sites', {
                url: '/sites',
                templateUrl: 'modules/sites/views/sites.client.view.html',
                resolve: {
                    organization:function( Organization ){
                        return Organization.promise;
                    }
                }
            });
    }
]);
