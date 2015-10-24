'use strict';

angular
    .module('gmaps')
    .controller('GmapController', GmapController);
GmapController.$inject = ['$scope','$modalInstance'];
function GmapController($scope, $modalInstance) {

    $scope.render = true;
    $scope.lat = 0;
    $scope.lng = 0;
    $scope.changeLocation = function (lat, lng) {
        $scope.lat = lat;
        $scope.lng = lng;
    };

    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.apply = function () {
        var newPos = {};
        newPos.lat = $scope.lat;
        newPos.lng = $scope.lng;
        $modalInstance.close(newPos);
    }
}
