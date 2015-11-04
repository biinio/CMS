/**
 * Created by Ivan on 8/24/15.
 */
/**=========================================================
 * Module: sidebar.js
 * Wraps the sidebar and handles collapsed state
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.core')
        .directive('organizationDropdown', organizationDropDown);

    organizationDropDown.$inject = ['$rootScope', '$window', '$http', 'Authentication'];
    function organizationDropDown ($rootScope, $window, $http, Authentication) {
        var $win = angular.element($window);
        var directive = {
            // bindToController: true,
            // controller: Controller,
            // controllerAs: 'vm',
            link: link,
            restrict: 'EA'
            //template: '<nav class="orgDropdown" ng-transclude></nav>',
            //transclude: true
            // scope: {}
        };
        return directive;

        function link(scope, element, attrs) {
            scope.selectedOrganization =  {};

            scope.organizations = [];

            scope.getSelectedOrganization = function( ) {
                return scope.selectedOrganization;
            };
            scope.getOrganizations = function() {
                var onSuccessCallback = function( data ){
                    if(data) {
                        scope.organizations = data;
                        scope.selectedOrganization = scope.organizations[0];
                    }
                };
                $http.get('/api/organization').success(onSuccessCallback.bind(scope)).error(function () {
                    console.error("Error: unable to load organizations");
                });
            };

            if (Authentication.user != "") {
                scope.getOrganizations();
            }

        }

    }


})();

