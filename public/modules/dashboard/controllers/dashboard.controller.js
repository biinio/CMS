/**=========================================================
 * Module: dashboard.js
 * Dashboard for biin
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$http', '$state','$scope', 'Authentication', 'Organization','GlobalFilters'];
    function DashboardController($http, $state, $scope, Authentication, Organization,GlobalFilters) {
        var vm = this;
        $scope.authentication = Authentication;
        $scope.organizationService = Organization;
        $scope.globalFilters = GlobalFilters;
        $scope.globalFilters.dateRange = 30;
        activate();

        ////////////////

        function activate() {
            var currentOrganization = $scope.organizationService.selectedOrganization;
            if (currentOrganization != 'undefined') {
                var currentSites = $scope.organizationService.selectedOrganization.sites;
            }

        }

        $scope.changeChartRange = function (numberDays) {
            $scope.globalFilters.changeDateRange(numberDays);
        }

        $scope.changeSelectedSite = function (selectedSite) {
            $scope.globalFilters.changeSelectedSite(selectedSite);
        }


    }
})();
