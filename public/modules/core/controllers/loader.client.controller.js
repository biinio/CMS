/**
 * Created by Ivan on 3/4/16.
 */
'use strict';

angular.module('app.core').controller('LoadingController', ['$scope','Loading',
    function($scope, LoadingService) {
        $scope.loading = LoadingService;
    }
]);
