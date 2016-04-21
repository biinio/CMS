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
        .controller('sitesPieVisitsController', sitesPieVisitsController);

    sitesPieVisitsController.$inject = ['$http', '$state','$scope', 'Authentication', 'Organization','GlobalFilters'];
    function sitesPieVisitsController($http, $state, $scope, Authentication, Organization,GlobalFilters) {

        var vm = this;
        $scope.value = 0;
        $scope.enoughData = false;

        $scope.news = 0;
        $scope.returning = 0;
        $scope.total = 0;

        activate();

        ////////////////
        function activate() {
            $scope.authentication = Authentication;
            $scope.organizationService = Organization;
            $scope.globalFilters = GlobalFilters;
        }

        $scope.$on('organizationChanged',function(){
            $scope.getChartData($scope.globalFilters.dateRange);
        });

        $scope.$on('Biin: Days Range Changed',function(scope,numberdays){
            $scope.changeChartRange($scope.globalFilters.dateRange);
        });

        $scope.$on('Biin: Site Changed', function(){
            $scope.getChartData($scope.globalFilters.dateRange);
        });

        $scope.getChartData = function ( days )
        {
            var filters = {};
            filters.organizationId = $scope.organizationService.selectedOrganization.identifier;
            filters.dateRange = $scope.globalFilters.dateRange;
            filters.siteId = $scope.globalFilters.selectedSite.identifier;

            $http.get(ApplicationConfiguration.applicationBackendURL+'api/dashboard/local/newsvsreturning',{ headers:{
                filters : JSON.stringify(filters),
                offset : new Date().getTimezoneOffset() } } ).success(function(data) {
                var information  = data.data;

                $scope.news = information.news || 0;
                $scope.returning = information.returning || 0;
                $scope.total = $scope.news + $scope.returning;
            });
        };

        $scope.changeChartRange = function( days ){
            $scope.getChartData(days);
        };

        $scope.changeChartRange($scope.globalFilters.dateRange);
    }
})();
