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
        $scope.currentDays = 0;

        activate();

        ////////////////
        function activate() {
            $scope.authentication = Authentication;
            $scope.organizationService = Organization;
        }


        $scope.$on('organizationChanged',function(){
            $scope.getChartData($scope.currentDays);
        });


        $scope.$on('Biin: Days Range Changed',function(scope,numberdays){
            $scope.changeChartRange(numberdays);
        });

        $scope.$on('Biin: Site Changed', function(){
            $scope.getChartData($scope.globalFilters.dateRange);
        });

        $scope.getChartData = function ( days )
        {
            var filters = {};
            filters.siteId = $scope.globalFilters.selectedSite.identifier;
            filters.organizationId = $scope.organizationService.selectedOrganization.identifier;
            filters.dateRange = $scope.globalFilters.dateRange;

            $http.get(ApplicationConfiguration.applicationBackendURL+'api/dashboard/local/sessions',{ headers:{
                filters : JSON.stringify(filters),
                offset : new Date().getTimezoneOffset() } } ).success(function(data) {
                $scope.value = data.data;
            });
        };

        $scope.changeChartRange = function( days ){
            $scope.getChartData(days);
            $scope.currentDays = days;
        };

        $scope.changeChartRange(30);
    }
})();
