(function () {
    'use strict';

    angular
        .module('app.core')
        .config(appRoutes)
    ;
    appRoutes.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider'];
    function appRoutes($stateProvider, $locationProvider, $urlRouterProvider, helper) {

        // Set the following to true to enable the HTML5 Mode
        // You may have to set <base> tag in index and a routing configuration in your server
        $locationProvider.html5Mode(false);

        // default route
        $urlRouterProvider.otherwise('/home');

        //
        // Application Routes
        // -----------------------------------
        $stateProvider
            .state('app', {
                // url: '/',
                abstract: true,
                templateUrl: 'modules/core/views/core.client.view.html',
                resolve: helper.resolveFor('modernizr', 'icons', 'filestyle')
            })
            .state('app.home', {
                url: '/home',
                templateUrl: 'modules/core/views/home.client.view.html',
                resolve: {
                    organization:function( Organization ){
                        return Organization.promise;
                    }
                }
            })
            /*.state('app.biinUsers', {
                url: '/login',
                templateUrl: 'modules/biinUsers/views/login.client.view.html',
                resolve: helper.resolveFor('biinUsers')
            })
            .state('app.dashboard', {
                url: '/dashboard',
                templateUrl: 'modules/dashboard/views/dashboard.client.view.html',
                resolve: helper.resolveFor('dashboard')
            })*/
            //
            // CUSTOM RESOLVES
            //   Add your own resolves properties
            //   following this object extend
            //   method
            // -----------------------------------
            // .state('app.someroute', {
            //   url: '/some_url',
            //   templateUrl: 'path_to_template.html',
            //   controller: 'someController',
            //   resolve: angular.extend(
            //     helper.resolveFor(), {
            //     // YOUR RESOLVES GO HERE
            //     }
            //   )
            // })
        ;

    }
})();
