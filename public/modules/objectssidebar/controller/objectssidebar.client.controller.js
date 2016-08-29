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

    ObjectsSideBar.$inject = ['$http', '$state','$scope','$rootScope','ObjectsSidebar','Organization'];
    function ObjectsSideBar($http, $state, $scope,$rootScope,ObjectsSidebar,Organization) {
        var vm = this;
        activate();

        ////////////////

        function activate() {
            $scope.isHidden = false;
            $scope.objectsSidebarService = ObjectsSidebar;
            //Organization Service
            $scope.organizationService = Organization;
            //Draggable Properties
            $scope.organizationId = $scope.organizationService.selectedOrganizationId;
            $scope.currentDate = new Date().getTime();

            if($scope.organizationId) {
                //----Functions----//
                //Get the List of Products
                $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/readyElements/').success(function(data) {
                    $scope.products = data.data.elements;
                });
                //Get the List of Gifts
                $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/gifts').success(function(gifts) {
                    $scope.gifts = gifts;
                });
            }
        }

        //Function to set the image of the current product into the thumbnail in the Objects Sidebar
        $scope.setProductImage = function (product) {
            for(var i in $scope.products){
                if(product == $scope.products[i].elementIdentifier){
                    return $scope.products[i].media[0].url;
                }
            }
        };
        
        //Formatting dates
        $scope.formDate = function(date) {
            return new Date(date).getTime();
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

