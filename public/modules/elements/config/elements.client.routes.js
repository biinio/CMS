/**
 * Created by Ivan on 8/27/15.
 */
'use strict';

// Setting up route
angular.module('elements').config(['$stateProvider',
    function($stateProvider) {
        // Users state routing
        $stateProvider.
            state('appleftbar.elements', {
                url: '/elements',
                templateUrl: 'modules/elements/views/elements.client.view.html',
                resolve:{
                    organization:function( Organization ){
                        return Organization.promise;
                    }
                }
            });
    }
]);
