/**=========================================================
 * Module: giftboard.client.controller.js
 * giftboard for Biin in dashboard
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('dashboard')
        .controller('giftboardController', giftboardController);

    giftboardController.$inject = ['$scope'];

    function giftboardController($scope) {
        var giftboard = this;
        init();

        function init() {
            $scope.statuses = [{name: 'Asignar'}, {name: 'Enviados'}, {name: 'Reclamados'}, {name: 'Entregados'}];
        }
    }
})();
