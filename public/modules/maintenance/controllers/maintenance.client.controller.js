/**=========================================================
 * Module: maintenance.js
 * Maintenance for biin
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('maintenance')
        .controller('MaintenanceController', MaintenanceController);

    MaintenanceController.$inject = ['$http', '$state', '$timeout', '$scope', 'Authentication', 'ObjectsSidebar'];
    function MaintenanceController($http, $state, $timeout, $scope, Authentication, ObjectsSidebar) {
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
        $scope.sidebarTemplate =
            "<div>" +
                "<h5>{{item.name}}</h5>" +

            "<label>{{item.assignedBeacons}}</label>" +
            "<br/>" +
            "</div>";

        $scope.objectsSidebarService.template = $scope.sidebarTemplate;

        /**=============================================================================================================
         * Events Listeners
         *
         =============================================================================================================*/

        $scope.$on('$stateChangeStart', function () {
            $scope.objectsSidebarService.reset();
        });


        $scope.$on("Biin: On Object Clicked", function (event, objectClicked) {
            console.log("hgfhg");
            //I know it's ugly and I don't like this approach, it should be other way to  validate if the tag field is
            // rendered to call this code
            //TODO: Change this implementation for another safer way!!!
            $timeout(function () {
                var siteSearchTag = $('#siteSearchTag');
                siteSearchTag.tagsinput("removeAll");
                for (var i = 0; i < $scope.objectsSidebarService.selectedObject.searchTags.length; i++) {
                    siteSearchTag.tagsinput("add", $scope.objectsSidebarService.selectedObject.searchTags[i]);
                }
            }, 100);

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

            $scope.showBiinsPerOrganization = function(index)
            {
                $http.get('maintenance/getBiinsOrganizationInformation/'+$scope.organizations[index].identifier).success(function(data){
                    $scope.selectedOrganization = index;
                    $scope.organizations[index].biins = data.biins;
                    $scope.defaultUUID = data.defaultUUID;
                    $scope.biinsXOrganization = $scope.organizations[index].biins;
                    for(var i = 0; i < $scope.biinsXOrganization.length; i++)
                    {
                        for(var j = 0; j < $scope.organizations[index].sites.length; j++)
                        {
                            if($scope.biinsXOrganization[i].siteIdentifier == $scope.organizations[index].sites[j].identifier)
                            {
                                $scope.biinsXOrganization[i].siteName = $scope.organizations[index].sites[j].title2;
                                break;
                            }
                        }
                    }
                });
            }
            $scope.showBiinsPerOrganization(0);

            $scope.showAddBiintoOrganizationModal = function ( mode, beacon)
            {
                var modalInstance = $modal.open({
                    templateUrl: 'maintenance/addBiinToOrganizationModal',
                    controller: 'addOrEditBeaconController',
                    size:'lg',
                    resolve:{
                        selectedElement : function()
                        {
                            return { sites: $scope.organizations[$scope.selectedOrganization].sites};
                        },
                        mode : function() { return mode },
                        beacon : function(){ return beacon},
                        selectedOrganization : function()
                        {
                            return { organization: $scope.organizations[$scope.selectedOrganization]};
                        },
                        defaultUUID : function() { return $scope.defaultUUID; }
                    }
                });
                modalInstance.result.then(function ( beacon ) {
                    $scope.showBiinsPerOrganization($scope.selectedOrganization);
                    if(mode == "create" ){
                        $scope.organizations[$scope.selectedOrganization].sites[beacon.siteIndex].minorCounter = $scope.organizations[$scope.selectedOrganization].sites[beacon.siteIndex].minorCounter ? $scope.organizations[$scope.selectedOrganization].sites[beacon.siteIndex].minorCounter+1 : 1;
                        $scope.organizations[$scope.selectedOrganization].biinsAssignedCounter = $scope.organizations[$scope.selectedOrganization].biinsAssignedCounter ? $scope.organizations[$scope.selectedOrganization].biinsAssignedCounter+1 : 1;
                    }
                    else{
                        if(beacon.minorHasChanged && beacon.biinType != "1"){
                            $scope.organizations[$scope.selectedOrganization].sites[beacon.siteIndex].minorCounter = $scope.organizations[$scope.selectedOrganization].sites[beacon.siteIndex].minorCounter+1;
                            delete beacon.minorHasChanged;
                        }
                    }
                }, function () {
                    $scope.showBiinsPerOrganization($scope.selectedOrganization);
                });
            }
        }).error(function(err){
            console.log(err);
        });
    }
})();
