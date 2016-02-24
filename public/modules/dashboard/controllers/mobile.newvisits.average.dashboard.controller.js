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
        .controller('mobileNewVisitsPercentageController', mobileNewVisitsPercentageController);

    mobileNewVisitsPercentageController.$inject = ['$http', '$state','$scope', 'Authentication', 'Organization','GlobalFilters'];
    function mobileNewVisitsPercentageController($http, $state, $scope, Authentication, Organization,GlobalFilters) {
        var vm = this;
        $scope.value = 0;

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

        $scope.getChartData = function ( days )
        {
            var filters = {};
            filters.organizationId = $scope.organizationService.selectedOrganization.identifier;
            filters.dateRange = $scope.globalFilters.dateRange;

            $http.get(ApplicationConfiguration.applicationBackendURL+'api/dashboard/mobile/newvisits',
                { headers:{
                    filters : JSON.stringify(filters),
                    offset : new Date().getTimezoneOffset() } } ).success(function(data) {
                $scope.value = data.data;
            });
        };

        $scope.changeChartRange = function( days ){
            $scope.getChartData(days);
        };

        $scope.changeChartRange($scope.globalFilters.dateRange);
    }
})();
