/**=========================================================
 * Module: maintenance.js
 * Maintenance for biin
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('maintenance')
        .controller('MaintenanceController', MaintenanceController);

    MaintenanceController.$inject = ['$http', '$state', '$timeout', '$scope', '$modal', 'Authentication', 'ObjectsSidebar'];
    function MaintenanceController($http, $state, $timeout, $scope, $modal, Authentication, ObjectsSidebar) {
        var vm = this;
        activate();

        function activate() {
            $scope.authentication = Authentication;
        }

        /**=============================================================================================================
         * ObjectsSidebar Configuration
         *
         =============================================================================================================*/
        $scope.objectsSidebarService = ObjectsSidebar;
        $scope.objectsSidebarService.template =
            "<div class='sidebar-padding'>" +
                "<h5>{{item.name}}</h5>" +

            "<label>{{item.assignedBeacons}}</label> Beacons" +
            "<br/>" +
            "</div>";

        /**=============================================================================================================
         * Events Listeners
         *
         =============================================================================================================*/

        $scope.$on('$stateChangeStart', function () {
            $scope.objectsSidebarService.reset();
        });

        $scope.$on("Biin: On Object Clicked", function(event,objectClicked){
            $scope.showBiinsPerOrganization(objectClicked);
        });


        /**=============================================================================================================
         * Variables
         =============================================================================================================*/


        /**=============================================================================================================
         * Self called functions
         =============================================================================================================*/

        /**=============================================================================================================
         *  Functions
         =============================================================================================================*/

        $http.get('https://qa-biinapp.herokuapp.com/maintenance/organizations').success(function(data){
            $scope.objectsSidebarService.setObjects(data);
            console.log($scope.objectsSidebarService.getObjects());

            for (var i = 0; i < $scope.objectsSidebarService.objects.length ; i++) {
                $scope.objectsSidebarService.objects[i].unassignedBeacons = $scope.objectsSidebarService.objects[i].biinsCounter - $scope.objectsSidebarService.objects[i].biinsAssignedCounter;
                $scope.objectsSidebarService.objects[i].assignedBeacons = $scope.objectsSidebarService.objects[i].biinsAssignedCounter;
            }

            $scope.selectedOrganization = null;
            $scope.biinsXOrganization = null;
            $scope.defaultUUID = "";

            $scope.getTypeName = function(type)
            {
                if(type == "1")
                {
                    return "External";
                }
                else if (type == "2")
                {
                    return "Internal";
                }
                else
                {
                    return "Product"
                }
            }


            $scope.showBiinsPerOrganization = function(selectedObject)
            {
                $http.get('https://qa-biinapp.herokuapp.com/maintenance/getBiinsOrganizationInformation/'+$scope.objectsSidebarService.selectedObject.identifier).success(function(data){
                    $scope.objectsSidebarService.selectedObject.biins = data.biins;
                    $scope.defaultUUID = data.defaultUUID;
                    $scope.biinsXOrganization = $scope.objectsSidebarService.selectedObject.biins;

                    for(var i = 0; i < $scope.biinsXOrganization.length; i++)
                    {
                        for(var j = 0; j < selectedObject.sites.length; j++)
                        {
                            if($scope.biinsXOrganization[i].siteIdentifier == selectedObject.sites[j].identifier)
                            {
                                $scope.biinsXOrganization[i].siteName = selectedObject.sites[j].title2;
                                break;
                            }
                        }
                    }
                });
            }

            $scope.showAddBiintoOrganizationModal = function ( mode, beacon)
            {
                var modalInstance = $modal.open({
                    templateUrl: '/modules/maintenance/views/partials/managebiintoorganization.client.modal.html',
                    controller: 'manageBiinToOrganization',
                    size:'lg',
                    resolve:{
                       selectedElement : function()
                        {
                            return { sites: $scope.objectsSidebarService.selectedObject.sites};
                        },
                        mode : function() { return mode },
                        beacon : function(){ return beacon},
                        selectedOrganization : function()
                        {
                            return { organization: $scope.objectsSidebarService.selectedObject};
                        },
                        defaultUUID : function() { return $scope.defaultUUID; }
                    }
                });

                modalInstance.result.then(function ( beacon ) {
                    $scope.showBiinsPerOrganization($scope.objectsSidebarService.selectedObject);
                    if(mode == "create" ){
                        $scope.objectsSidebarService.selectedObject.sites[beacon.siteIndex].minorCounter = $scope.objectsSidebarService.selectedObject.sites[beacon.siteIndex].minorCounter ? $scope.objectsSidebarService.selectedObject.sites[beacon.siteIndex].minorCounter+1 : 1;
                        $scope.objectsSidebarService.selectedObject.assignedBeacons = $scope.objectsSidebarService.selectedObject.assignedBeacons ? $scope.objectsSidebarService.selectedObject.assignedBeacons+1 : 1;

                    }
                    else{
                        if(beacon.minorHasChanged && beacon.biinType != "1"){
                            $scope.objectsSidebarService.selectedObject.sites[beacon.siteIndex].minorCounter = $scope.objectsSidebarService.selectedObject.sites[beacon.siteIndex].minorCounter+1;
                            delete beacon.minorHasChanged;
                        }
                    }
                }, function () {
                    $scope.showBiinsPerOrganization($scope.objectsSidebarService.selectedObject);
                });
            }
        }).error(function(err){
            console.log(err);
        });
    }
})();
