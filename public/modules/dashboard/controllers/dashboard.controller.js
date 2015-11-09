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
            if (currentOrganization != 'undefined' && currentOrganization.sites.length > 0) {
                $scope.globalFilters.selectedSite = currentOrganization.sites[0];
            }
        }

        $scope.changeChartRange = function (numberDays) {
            $scope.globalFilters.changeDateRange(numberDays);
        }

        $scope.changeSelectedSite = function () {
            $scope.globalFilters.changeSelectedSite($scope.globalFilters.selectedSite);
        }

        $scope.$on('organizationChanged', function () {
            $scope.globalFilters.changeSelectedSite($scope.organizationService.selectedOrganization.sites[0]);
        });


    }
})();
