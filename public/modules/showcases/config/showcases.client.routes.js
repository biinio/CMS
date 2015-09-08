/**
 * Created by Ivan on 8/27/15.
 */
'use strict';

// Setting up route
angular.module('showcases').config(['$stateProvider',
    function($stateProvider) {
        // Users state routing
        $stateProvider.
            state('app.showcases', {
                url: '/showcases',
                templateUrl: 'modules/showcases/views/showcases.client.view.html'
            });
    }
]);