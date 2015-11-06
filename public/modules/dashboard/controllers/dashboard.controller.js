/**=========================================================
 * Module: dashboard.js
 * Dashboard for biin
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$http', '$state','$scope', 'Authentication', 'Organization','GlobalFilters'];
    function DashboardController($http, $state, $scope, Authentication, Organization,GlobalFilters) {
        var vm = this;
        $scope.authentication = Authentication;
        $scope.organizationService = Organization;
        $scope.globalFilters = GlobalFilters;
        $scope.globalFilters.dateRange = 30;
        activate();

        ////////////////

        function activate() {

        }

        $scope.changeChartRange = function (numberDays) {
            $scope.globalFilters.changeDateRange(numberDays);
        }
    }
})();
