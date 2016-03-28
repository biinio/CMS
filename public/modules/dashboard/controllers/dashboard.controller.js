/**=========================================================
 * Module: dashboard.js
 * Dashboard for biin
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$http', '$state','$scope', 'Authentication', 'Organization','ObjectsSidebar','GlobalFilters','Loading'];
    function DashboardController($http, $state, $scope, Authentication, Organization,ObjectsSidebar,GlobalFilters,Loading) {
        var vm = this;
        $scope.authentication = Authentication;
        $scope.organizationService = Organization;
        $scope.globalFilters = GlobalFilters;
        $scope.objectsSidebar = ObjectsSidebar;

        $scope.objectsSidebar.isHidden = true;
        $scope.loadingService = Loading;
        $scope.loadingService.isLoading = false;

        activate();

        ////////////////

        function activate() {

            $scope.globalFilters.dateRange = 30;
            //$scope.globalFilters.selectedSite = $scope.organizationService.selectedOrganization.sites[0];

        }

        $scope.$on('$stateChangeStart', function(){
            $scope.loadingService.isLoading = true;
            $scope.objectsSidebarService.reset();
        });


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
