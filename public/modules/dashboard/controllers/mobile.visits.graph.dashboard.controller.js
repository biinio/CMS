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
        .controller('mobilePieVisitsController', mobilePieVisitsController);

    mobilePieVisitsController.$inject = ['$http', '$state','$scope', 'Authentication', 'Organization','GlobalFilters'];
    function mobilePieVisitsController($http, $state, $scope, Authentication, Organization,GlobalFilters) {

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
            $scope.reset();
            $scope.getChartData($scope.globalFilters.dateRange);
        });

        $scope.$on('Biin: Days Range Changed',function(scope,numberdays){
            $scope.reset();
            $scope.changeChartRange($scope.globalFilters.dateRange);
        });

        $scope.$on('Biin: Site Changed',function(scope,site){
            $scope.reset();
            $scope.getChartData($scope.globalFilters.dateRange);
        });

        $scope.reset = function () {
            $scope.news = 0;
            $scope.returning = 0;
            $scope.total = 0;
        };

        $scope.getChartData = function ( days )
        {
            var filters = {};
            filters.organizationId = $scope.organizationService.selectedOrganization.identifier;
            filters.dateRange = $scope.globalFilters.dateRange;
            filters.siteId = $scope.globalFilters.selectedSite.identifier;

            $http.get(ApplicationConfiguration.applicationBackendURL+'api/dashboard/mobile/newsvsreturning',{ headers:{
                filters : JSON.stringify(filters),
                offset : new Date().getTimezoneOffset() }
                } ).success(function(data) {
                var information  = data.data;
                $scope.enoughData = information.news || information.returning;

                $scope.news = information.news || 0;
                $scope.returning = information.returning || 0;
                $scope.total = information.totalSessions || 0;
            });
        };

        $scope.changeChartRange = function( days ){
            $scope.getChartData(days);
        };

        $scope.changeChartRange($scope.globalFilters.dateRange);
    }
})();
