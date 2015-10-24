/**
 * Created by sofi on 10/8/15.
 */
/**=========================================================
 * Module: maintenance.js
 * Maintenance for biin
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('maintenance')
        .controller('manageBiinToOrganization', ManageBiinToOrganization);

    ManageBiinToOrganization.$inject = ['$scope', '$modalInstance', '$http', 'selectedElement', 'mode', 'beacon', 'selectedOrganization', 'defaultUUID'];
    function ManageBiinToOrganization($scope, $modalInstance, $http, selectedElement, mode, beacon, selectedOrganization, defaultUUID) {

        /**=============================================================================================================
         * ObjectsSidebar Configuration
         *
         =============================================================================================================*/

        /**=============================================================================================================
         * Events Listeners
         *
         =============================================================================================================*/


        /**=============================================================================================================
         * Variables
         =============================================================================================================*/


        /**=============================================================================================================
         * Self called functions
         =============================================================================================================*/

        /**=============================================================================================================
         *  Functions
         =============================================================================================================*/

        $scope.sites = selectedElement.sites;
        $scope.mode = mode;
        $scope.beacon = null;
        $scope.selectedOrganization = selectedOrganization.organization;
        $scope.minor = 0;
        $scope.siteIndexFromBeacon = 0;
        $scope.lockValues = false;
        $scope.minorHasChanged = false;
        $scope.siteMinor = 0;

        if (mode == "create") {
            if ($scope.sites.length > 0) {
                $scope.selectedSite = $scope.sites[0];
                $scope.minor = parseInt($scope.selectedSite.minorCounter) + 1;
                $scope.siteMinor = parseInt($scope.selectedSite.minorCounter) + 1;

            }

            $scope.beacon = {
                identifier: "",
                name: "",
                status: "No Programmed",
                proximityUUID: defaultUUID,
                registerDate: "",
                biinType: "3",
                venue: ""
            }
        }
        else {
            $scope.beacon = beacon;
            $scope.minor = parseInt(beacon.minor);
            $scope.lockValues = $scope.beacon.status != "No Programmed";
            $scope.initialBeaconType = $scope.beacon.biinType;
            $scope.isExternalBeaconType = $scope.beacon.biinType == "1";
            var end = false;
            var indiceSelect = -1;


            for (var i = 0; i < $scope.sites.length; i++) {
                if ($scope.sites[i].identifier == $scope.beacon.siteIdentifier) {
                    $scope.selectedSite = $scope.sites[i];
                    break;
                }
            }

            /*for (var i = 0; i < $scope.sites.length && !end; i++) {
                if ($scope.sites[i].identifier == $scope.beacon.siteIdentifier) {
                    indiceSelect = i;
                    end = true;

                    //Binding the value in the view
                    setTimeout(function () {
                        $scope.selectedSite = indiceSelect;
                        $scope.siteIndexFromBeacon = indiceSelect;
                        $scope.siteMinor = parseInt($scope.sites[indiceSelect].minorCounter);
                        $scope.$apply(); //this triggers a $digest

                    }, 100);
                }
            }*/
        }

        $scope.save = function () {
            $scope.beacon.major = $scope.selectedSite.major;
            $scope.beacon.siteIdentifier = $scope.selectedSite.identifier;
            $scope.beacon.siteIndex = $scope.sites.indexOf($scope.selectedSite);
            $scope.beacon.isAssigned = true;
            $scope.beacon.organizationIdentifier = $scope.selectedOrganization.identifier;
            $scope.beacon.accountIdentifier = $scope.selectedOrganization.accountIdentifier;
            $scope.beacon.minor = $scope.minor;
            $scope.beacon.siteMinor = $scope.siteMinor;

            if ($scope.mode == "create") {
                $scope.beacon.mode = "create";
                $http.put(ApplicationConfiguration.applicationBackendURL + 'maintenance/insertBiin', $scope.beacon).success(function (data, status) {
                    $modalInstance.close($scope.beacon);
                }).error(function (data, status) {
                    $scope.message = data.message;
                    console.log(data);
                    console.log(status);
                });
            }
            else {
                $scope.beacon.mode = "edit";
                $http.post(ApplicationConfiguration.applicationBackendURL + 'maintenance/insertBiin', $scope.beacon).success(function (data, status) {
                    console.log("success");
                    $scope.beacon.minorHasChanged = $scope.minorHasChanged;
                    $modalInstance.close($scope.beacon);
                }).error(function (data, status) {
                    console.log(data);
                    console.log(status);
                });
            }
        }

        $scope.selectSite = function (site) {
            if ($scope.beacon.biinType == "1") {
                $scope.minor = 1;
                $scope.siteMinor = mode == "create" ? parseInt(site.minorCounter) : parseInt(site.minorCounter) + 1;
            } else {
                if (mode == "create") {
                    $scope.minor = parseInt(site.minorCounter) + 1;
                    $scope.siteMinor = parseInt(site.minorCounter) + 1;
                } else {
                    if ($scope.siteIndexFromBeacon == $scope.sites.indexOf(site) && $scope.isExternalBeaconType) {
                        $scope.minor = parseInt($scope.beacon.minor);
                        $scope.siteMinor = parseInt(site.minorCounter);
                        $scope.minorHasChanged = false;
                    } else {
                        $scope.minor = parseInt(site.minorCounter) + 1;
                        $scope.siteMinor = parseInt(site.minorCounter) + 1;
                        $scope.minorHasChanged = true;
                    }
                }
            }
            $scope.selectedSite = site;
        }

        $scope.onTypeChange = function (value) {
            if (value == "1") {
                $scope.minor = 1;
                $scope.minorHasChanged = !$scope.isExternalBeaconType;
                //TODO: FIX INDEX
                // $scope.siteMinor = pmode == "create" ? parseInt($scope.sites[index].minorCounter) : parseInt($scope.sites[index].minorCounter) + 1;
            } else {
                if ($scope.siteIndexFromBeacon == $scope.selectedSite && $scope.isExternalBeaconType == (value == "1")) {
                    $scope.minor = parseInt($scope.beacon.minor);
                    $scope.siteMinor = parseInt($scope.selectedSite.minorCounter);
                    $scope.minorHasChanged = false;
                } else {
                    $scope.minorHasChanged = true;
                    $scope.minor = parseInt($scope.selectedSite.minorCounter) + 1;
                    $scope.siteMinor = parseInt($scope.selectedSite.minorCounter) + 1;
                }
            }
        }
        $scope.selectStatus = function (status) {
            $scope.lockValues = status != "No Programmed"
        }

        $scope.ok = function () {
            $modalInstance.close($scope.objectIndex);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }
})();

