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
        .module('objectssidebar')
        .controller('ObjectsSideBar', ObjectsSideBar);

    ObjectsSideBar.$inject = ['$http', '$state','$scope','$rootScope','ObjectsSidebar'];
    function ObjectsSideBar($http, $state, $scope,$rootScope,ObjectsSidebar) {
        var vm = this;
        activate();

        $scope.isHidden = false;
        $scope.objectsSidebarService = ObjectsSidebar;
        ////////////////

        function activate() {
        }

        $scope.onObjectClick = function( index ){
            var objectClicked = $scope.objectsSidebarService.getObjects()[index];
            $scope.objectsSidebarService.selectedObject = objectClicked;
            $rootScope.$broadcast("Biin: On Object Clicked", objectClicked);
        };

        $scope.create = function(){
            $rootScope.$broadcast("Biin: On Object Created");
        };

        $scope.hideObjectsMenu =function()
        {
            if($scope.isHidden){
                $(".right-section-content").removeClass("extended");
                $(".objects-sidebar").removeClass("contracted");
            }
            else{
                $(".right-section-content").addClass("extended");
                $(".objects-sidebar").addClass("contracted");
            }
            $scope.isHidden = !$scope.isHidden;
        };

        $scope.deleteItem = function(index , $event){
            console.warn("Delete clicked " + index);
            $event.stopPropagation();
            $rootScope.$broadcast("Biin: On Object Deleted",index);
        };
    }
})();

