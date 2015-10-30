'use strict';

// Setting up route
angular.module('dashboard').config(['$stateProvider',
    function ($stateProvider) {
        // Users state routing
        $stateProvider.
            state('app.dashboard', {
                url: '/dashboard',
                templateUrl: 'modules/dashboard/views/dashboard.client.view.html',
                resolve: {
                    organization: function (Organization) {
                        return Organization.promise;
                    }
                }
            });
    }
]);
