/**
 * Created by Ivan on 3/4/16.
 */
'use strict';

angular.module('app.core').controller('LoadingController', ['$rootScope','$scope','Loading', 'Utils',
    function($rootScope, $scope, LoadingService, Utils) {
        $scope.loading = LoadingService;
        $scope.isCollapse = Utils.isSidebarCollapsed();

        $rootScope.$watch('app.layout.isCollapsed', function(newValue) {
            $scope.isCollapse = newValue;
        });
    }
]);
