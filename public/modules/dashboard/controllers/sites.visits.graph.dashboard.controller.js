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

    sitesPieVisitsController.$inject = ['$http', '$state','$scope', 'Authentication', 'Organization'];
    function sitesPieVisitsController($http, $state, $scope, Authentication, Organization) {
        var vm = this;
        activate();

        ////////////////

        function activate() {
            $scope.authentication = Authentication;
            $scope.organizationService = Organization;
        }

        $scope.organizationId = $scope.organizationService.selectedOrganization.identifier;
        $scope.currentDays = 0;

        $scope.$on('organizationsChanged', function(orgId) {
            $scope.getChartData($scope.currentDays);
        });

        $scope.getChartData = function ( days )
        {
            $scope.options = {
                chart: {
                    type: 'pieChart',
                    height: 250,
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

            $scope.data = [
                {
                    key: "New Visits",
                    y: 2
                },
                {
                    key: "Frecuent Client",
                    y: 6
                }
            ];
        };

        $scope.changeChartRange = function( days ){
            $scope.getChartData(days);
            $scope.currentDays = days;
        };
        $scope.changeChartRange(30);

    }
})();
