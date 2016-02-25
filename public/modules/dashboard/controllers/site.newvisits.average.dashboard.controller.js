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
        .controller('siteNewVisitsPercentageController', siteNewVisitsPercentageController);

    siteNewVisitsPercentageController.$inject = ['$http', '$state','$scope', 'Authentication', 'Organization','GlobalFilters'];
    function siteNewVisitsPercentageController($http, $state, $scope, Authentication, Organization,GlobalFilters) {
        var vm = this;
        $scope.value = 0;

        activate();


        function activate() {
            $scope.authentication = Authentication;
            $scope.organizationService = Organization;
            $scope.globalFilters = GlobalFilters;
        }

        $scope.$on('organizationChanged',function(){
            $scope.getChartData();
        });

        $scope.$on('Biin: Days Range Changed',function(scope,numberdays){
            $scope.changeChartRange($scope.globalFilters.dateRange);
        });

        $scope.$on('Biin: Site Changed', function(){
            $scope.getChartData();
        });



        $scope.getChartData = function ()
        {
            var filters = {};
            filters.siteId = $scope.globalFilters.selectedSite.identifier;
            filters.organizationId = $scope.organizationService.selectedOrganization.identifier;
            filters.dateRange = $scope.globalFilters.dateRange;


            $http.get(ApplicationConfiguration.applicationBackendURL+'api/dashboard/local/newvisits',
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
