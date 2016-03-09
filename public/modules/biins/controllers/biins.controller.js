/**=========================================================
 * Module: biins.controller.js
 * Controller for biins section
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('biins')
        .controller('BiinsController', BiinsController);

    BiinsController.$inject = ['$http', '$state', '$scope','$modal', 'Authentication', 'Organization', 'ObjectsSidebar','Loading'];
    function BiinsController($http, $state, $scope,$modal, Authentication, Organization, ObjectsSidebar,Loading) {


        /**=============================================================================================================
         *  Functions
         =============================================================================================================*/

        $scope.objectsSidebarService = ObjectsSidebar;
        $scope.objectsSidebarService.enableAddButton = false;

        $scope.getSiteName = function (identifier) {
            var site = _.findWhere($scope.sites, {identifier: identifier});
            if (site) {
                return site.title1 + " " + site.title2;
            } else {
                return "";
            }
        };

        $scope.getObjectName = function (identifier, type) {
            if (identifier && type) {
                if (type === "1") {
                    var el = null;
                    for(var i = 0; i< $scope.sites.length; i++ ){
                        for(var j= 0; j<$scope.sites[i].showcases.length;j++){
                            for(var k = 0; k<$scope.sites[i].showcases[j].elements.length;k++){
                                if($scope.sites[i].showcases[j].elements[k]._id == identifier){
                                    var elementIdentifier = $scope.sites[i].showcases[j].elements[k].identifier;
                                    el = _.findWhere($scope.elements, {elementIdentifier: elementIdentifier});
                                }
                            }
                        }
                    }
                    if (el)
                        return el.title;
                }
                else {
                    var sh = _.findWhere($scope.showcases, {identifier: identifier});
                    if (sh)
                        return sh.name;
                }
            }
            return "name not available";
        };

        $scope.removeObject = function (index) {
            $scope.objectsSidebarService.selectedObject.objects.splice(index, 1);
            $scope.biins = $scope.objectsSidebarService.getObjects();
        };

        //Save The Biin Objects Changes
        $scope.save = function () {

            if ($scope.objectsSidebarService.selectedObject != null) {
                $http.put(ApplicationConfiguration.applicationBackendURL + 'api/venues/create', null, {
                    headers: {
                        name: $scope.objectsSidebarService.selectedObject.venue,
                        orgidentifier: $scope.organizationId
                    }
                }).success(function () {
                    $http.post(ApplicationConfiguration.applicationBackendURL + 'api/biins/' + $scope.objectsSidebarService.selectedObject.identifier + '/update', $scope.objectsSidebarService.selectedObject).success(function () {
                        console.log("success");
                    }).error(function (err) {
                       console.log(err);
                    });
                });
            }
        };

        var vm = this;
        activate();

        ////////////////

        function activate() {
            $scope.authentication = Authentication;
            $scope.organizationService = Organization;
        }

        /**=============================================================================================================
         * ObjectsSidebar Configuration
         *
         =============================================================================================================*/
        $scope.objectsSidebarService = ObjectsSidebar;
        $scope.sidebarTemplate =
            "<div class='col-md-12 leftInformationArea' style='padding-left: 10px'>" +
                "<label class='threeRowTitle'>{{item.name}}</label>" +
                "<localization class='threeRowSubTitle' style='display: block'></localization>" +
                "<p class='threeRowThirdLine'>{{item.status}}</p>" +
            "</div>";
        $scope.objectsSidebarService.template = $scope.sidebarTemplate;
        $scope.objectsSidebarService.isHidden = false;
        $scope.loadingService = Loading;
        $scope.loadingService.isLoading = true;

        /**=============================================================================================================
         * Events Listeners
         *
         =============================================================================================================*/

        $scope.$on('$stateChangeStart', function () {
            $scope.objectsSidebarService.reset();
            $scope.objectsSidebarService.loadedInformation = false;
        });

        $scope.$on('organizationChanged', function () {
            $scope.objectsSidebarService.selectedObject = null;
            $scope.objectsSidebarService.objects = [];

            $scope.organizationId = $scope.organizationService.selectedOrganization.identifier;
            //Get the Sites Information
            $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/sites/').success(function (data) {
                $scope.sites = data.data.sites;
                //Get the elements
                $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/readyElementser/').success(function (data) {
                    $scope.elements = data.data.elements;
                    //Get the showcases
                    $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/showcases/').success(function (data) {
                        $scope.showcases = data.data;
                        $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/biins/').success(function (data) {
                            $scope.biins = data.data;
                            $scope.objectsSidebarService.setObjects(data.data);
                            $scope.loadingService.isLoading = false;
                        }).error(function (err) {
                            console.log(err);
                        });
                    }).error(function (err) {
                        console.log(err);
                    });
                }).error(function (err) {
                    console.log(err);
                });
            }).error(function (err) {
                console.log(err);
            });
        });

        $scope.$on("Biin: On Object Clicked", function (event, objectClicked) {

        });

        /**=============================================================================================================
         * Variables
         *
         =============================================================================================================*/

            //Init the the sites
        $scope.organizationId = $scope.organizationService.selectedOrganization.identifier;

        /**=============================================================================================================
         * Self called functions
         *
         =============================================================================================================*/

            //Get the Sites Information
        $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/sites/').success(function (data) {
            $scope.sites = data.data.sites;
            //Get the elements
            $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/readyElements/').success(function (data) {
                $scope.elements = data.data.elements;
                //Get the showcases
                $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/showcases/').success(function (data) {
                    $scope.showcases = data.data;
                    $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/biins/').success(function (data) {
                        $scope.biins = data.data;
                        $scope.objectsSidebarService.setObjects(data.data);
                        $scope.loadingService.isLoading = false;
                    }).error(function (err) {
                        console.log(err);
                    });
                }).error(function (err) {
                    console.log(err);
                });
            }).error(function (err) {
                console.log(err);
            });
        }).error(function (err) {
            console.log(err);
        });


        //Add an object to the objects collection
        $scope.saveObject = function (obj) {
            if (obj)
                if ('isNew' in obj) {
                    delete obj.isNew;
                    $scope.objectsSidebarService.selectedObject.objects.push(obj);
                    $scope.biins = $scope.objectsSidebarService.getObjects();
                }
            //$scope.biins.push(obj);
            //Todo Do the method to save the save the data
        };

        $scope.getVenues = function (val) {
            return $http.get(ApplicationConfiguration.applicationBackendURL + 'api/venues/search', {
                headers: {
                    regex: val,
                    orgidentifier: $scope.organizationId
                }
            }).then(function (response) {
                return response.data;
            });
        };

        $scope.convertTime = function (time) {
            var hours = parseInt(time);
            var min = ( parseFloat(time) - hours )*60;
            var hoursString = hours < 10 ? "0"+hours : ""+ hours;
            var minString = min < 10 ? "0"+min : ""+ min;
            return hoursString+":"+minString;
        };

        //Modal to edit or create an Object
        $scope.biinObject = function (size, type, obj) {

            var modalInstance = $modal.open({
                templateUrl: '/modules/biins/views/partials/biin.client.modal.view.html',
                controller: 'biinsModalController',
                size: size,
                resolve: {
                    selectedObj: function () {
                        if (type === 'create')
                            return {type: type};
                        else
                            return {type: type, obj: obj};
                    },
                    elements: function () {
                        return $scope.elements;
                    },
                    showcases: function () {
                        return $scope.showcases;
                    },
                    site: function(){
                        for(var i = 0; i< $scope.sites.length; i++){
                            if($scope.objectsSidebarService.selectedObject.siteIdentifier == $scope.sites[i].identifier){
                                return $scope.sites[i];
                            }
                        }
                        return null;
                    }


                }
            });


            modalInstance.result.then(function (objectToCreate) {
                $scope.saveObject(objectToCreate);
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        };
    }

})();
