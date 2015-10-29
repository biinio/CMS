/**
 * Created by Ivan on 10/26/15.
 */
/**=========================================================
 * Module: dashboard.js
 * Dashboard for biin
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('dashboard')
        .controller('siteSessionsController', siteSessionsController);

    siteSessionsController.$inject = ['$http', '$state','$scope', 'Authentication', 'Organization'];
    function siteSessionsController($http, $state, $scope, Authentication, Organization) {
        var vm = this;
        $scope.value = 0;

        activate();

        ////////////////

        function activate() {
            $scope.authentication = Authentication;
            $scope.organizationService = Organization;
        }

        $scope.organizationId = $scope.organizationService.selectedOrganization.identifier;
        $scope.currentDays = 0;

        $http.get(ApplicationConfiguration.applicationBackendURL+'api/dashboard/local/sessions').success(function(data) {
            $scope.value = data.data;
        });
    }
})();
