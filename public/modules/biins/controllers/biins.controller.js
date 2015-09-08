/**
 * Created by Ivan on 8/27/15.
 */
/**=========================================================
 * Module: dashboard.js
 * Dashboard for biin
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('biins')
        .controller('BiinsController', BiinsController);

    BiinsController.$inject = ['$http', '$state','$scope', 'Authentication', 'Organization'];
    function BiinsController($http, $state, $scope, Authentication, Organization) {
        var vm = this;
        activate();

        ////////////////

        function activate() {
            $scope.authentication = Authentication;
            $scope.organizationService = Organization;
        }
    }
})();
