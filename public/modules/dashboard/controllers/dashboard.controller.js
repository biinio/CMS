/**=========================================================
 * Module: dashboard.js
 * Dashboard for biin
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$http', '$state','$scope', 'Authentication', 'Organization'];
    function DashboardController($http, $state, $scope, Authentication, Organization) {
        var vm = this;
        activate();

        ////////////////

        function activate() {
            $scope.authentication = Authentication;
            $scope.organizationService = Organization;
        }

        $scope.changeChartRange = function (numberDays) {
            if(Number.isInteger(numberDays))
                $scope.$broadcast('Biin: Days Range Changed', numberDays);
        }
    }
})();
