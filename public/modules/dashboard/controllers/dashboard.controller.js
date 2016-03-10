/**=========================================================
 * Module: dashboard.js
 * Dashboard for biin
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$http', '$state','$scope', 'Authentication', 'Organization','ObjectsSidebar','GlobalFilters'];
    function DashboardController($http, $state, $scope, Authentication, Organization,ObjectsSidebar,GlobalFilters) {
        var vm = this;
        $scope.authentication = Authentication;
        $scope.organizationService = Organization;
        $scope.globalFilters = GlobalFilters;
        $scope.objectsSidebar = ObjectsSidebar;

        $scope.objectsSidebar.isHidden = true;

        activate();

        ////////////////

        function activate() {

            $scope.globalFilters.dateRange = 30;
            //$scope.globalFilters.selectedSite = $scope.organizationService.selectedOrganization.sites[0];

        }


        $scope.changeChartRange = function (numberDays) {
            $scope.globalFilters.changeDateRange(numberDays);
        }

        $scope.changeSelectedSite = function () {
            $scope.globalFilters.changeSelectedSite($scope.globalFilters.selectedSite);
        }

        $scope.$on('organizationChanged', function () {
            $scope.globalFilters.selectedSite = $scope.organizationService.selectedOrganization.sites[0];
            $scope.globalFilters.changeSelectedSite($scope.organizationService.selectedOrganization.sites[0]);
        });


    }
})();
