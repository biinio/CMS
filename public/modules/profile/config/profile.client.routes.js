/**
 * Created by Ivan on 8/19/15.
 */
'use strict';

// Setting up route
angular.module('dashboard').config(['$stateProvider',
    function($stateProvider) {
        // Users state routing
        $stateProvider.
            state('app.profile', {
                url: '/profile',
                templateUrl: 'modules/profile/views/profile.client.view.html',
                resolve: {
                    selectedOrganization: function (Organization) {
                        return Organization.getSelectedOrganization();
                    },
                    organization: function (Organization) {
                        return Organization.getOrganizations();
                    }
                }
            });
        /*.
         state('page.signup', {
         url: '/signup',
         templateUrl: 'modules/users/views/authentication/signup.client.view.html'
         }).
         state('page.forgot', {
         url: '/password/forgot',
         templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
         }).
         state('page.reset-invalid', {
         url: '/password/reset/invalid',
         templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
         }).
         state('page.reset-success', {
         url: '/password/reset/success',
         templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
         }).
         state('page.reset', {
         url: '/password/reset/:token',
         templateUrl: 'modules/users/views/password/reset-password.client.view.html'
         }).
         state('app.password', {
         url: '/settings/password',
         templateUrl: 'modules/users/views/settings/change-password.client.view.html'
         }).
         state('app.profile', {
         url: '/settings/profile',
         templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
         }).
         state('app.accounts', {
         url: '/settings/accounts',
         templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
         });*/
    }
]);
