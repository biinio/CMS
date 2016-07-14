/**=========================================================
 * Module: dashboard.js
 * Dashboard for biin
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$http', '$state','$scope', 'Authentication', 'Organization', 'ObjectsSidebar', 'GlobalFilters', 'Loading'];
    function DashboardController($http, $state, $scope, Authentication, Organization, ObjectsSidebar, GlobalFilters, Loading) {

        if (!Authentication.user) {
            $location.path('/');
        }

        $scope.authentication = Authentication;
        $scope.organizationService = Organization;
        $scope.globalFilters = GlobalFilters;
        $scope.objectsSidebar = ObjectsSidebar;

        $scope.objectsSidebar.isHidden = true;
        $scope.loadingService = Loading;
        $scope.loadingService.isLoading = false;


        $scope.presentialLoaderEnabled = true;
        $scope.virtualLoaderEnabled = true;

        var presentialChildren = {};
        presentialChildren.visitsGraph = true;
        presentialChildren.visitsTable = true;

        var virtualChildren = {};
        virtualChildren.visitsLiked = true;
        virtualChildren.visitsShared = true;
        virtualChildren.visitsTable = true;

        activate();

        ////////////////

        function activate() {
            $scope.globalFilters.dateRange = 30;
        }

        function resetValues(){
            $scope.presentialLoaderEnabled = true;
            $scope.virtualLoaderEnabled = true;

            presentialChildren.visitsGraph = true;
            presentialChildren.visitsTable = true;

            virtualChildren.visitsLiked = true;
            virtualChildren.visitsShared = true;
            virtualChildren.visitsTable = true;
        }

        $scope.$on('$stateChangeStart', function(){
            $scope.loadingService.isLoading = true;
            $scope.objectsSidebar.reset();
        });

        $scope.$on('Biin: Finished Presential Children To Load', function(scope, children){
            presentialChildren[children] = false;
            $scope.presentialLoaderEnabled = presentialChildren.visitsTable || presentialChildren.visitsGraph;
        });

        $scope.$on('Biin: Finished Virtual Children To Load', function(scope, children){
            virtualChildren[children] = false;
            $scope.virtualLoaderEnabled = virtualChildren.visitsLiked || virtualChildren.visitsTable || virtualChildren.visitsShared;
        });


        $scope.changeChartRange = function (numberDays) {
            resetValues();
            $scope.globalFilters.changeDateRange(numberDays);
        };

        $scope.changeSelectedSite = function () {
            $scope.globalFilters.changeSelectedSite($scope.globalFilters.selectedSite);
        };

        $scope.$on('organizationChanged', function () {
            $scope.globalFilters.selectedSite = $scope.organizationService.selectedOrganization.sites[0];
            $scope.globalFilters.changeSelectedSite($scope.organizationService.selectedOrganization.sites[0]);
        });

        $scope.setSelectedSite = function(site){
            resetValues();
            $scope.globalFilters.selectedSite = site;
            $scope.globalFilters.changeSelectedSite($scope.globalFilters.selectedSite);
        }


    }
})();
