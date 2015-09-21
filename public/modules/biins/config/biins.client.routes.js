/**
 * Created by Ivan on 8/27/15.
 */
'use strict';

// Setting up route
angular.module('biins').config(['$stateProvider',
    function($stateProvider) {
        // Users state routing
        $stateProvider.
            state('appleftbar.biins', {
                url: '/biins',
                templateUrl: 'modules/biins/views/biins.client.view.html'
            });
    }
]);
