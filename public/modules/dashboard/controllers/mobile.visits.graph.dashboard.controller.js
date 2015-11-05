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

        $scope.options = {
            chart: {
                type: 'pieChart',
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: true,
                transitionDuration: 500,
                labelThreshold: 0.01,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        };

        $scope.$on('Biin: Days Range Changed',function(scope,numberdays){
            $scope.changeChartRange($scope.globalFilters.dateRange);
        });

        $scope.getChartData = function ( days )
        {
            var filters = {};
            filters.organizationId = $scope.organizationService.selectedOrganization.identifier;
            filters.dateRange = $scope.globalFilters.dateRange;

            $http.get(ApplicationConfiguration.applicationBackendURL+'api/dashboard/mobile/newsvsreturning',{ headers:{
                filters : JSON.stringify(filters) } } ).success(function(data) {
                var information  = data.data;
                $scope.data = [
                    {
                        key: "New Visits",
                        y: information.news
                    },
                    {
                        key: "Frecuent Client",
                        y: information.returning
                    }
                ];
            });
        };

        $scope.changeChartRange = function( days ){
            $scope.getChartData(days);
        };

        $scope.changeChartRange($scope.globalFilters.dateRange);

    }
})();
