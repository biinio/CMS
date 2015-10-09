/**=========================================================
 * Module: biins.controller.js
 * Controller for biins section
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('biins')
        .controller('BiinsController', BiinsController);

    BiinsController.$inject = ['$http', '$state', '$scope', 'Authentication', 'Organization', 'ObjectsSidebar'];
    function BiinsController($http, $state, $scope, Authentication, Organization, ObjectsSidebar) {


        /**=============================================================================================================
         *  Functions
         =============================================================================================================*/

            //Save detail model object
        $scope.save = function () {

            $http.put('https://qa-biinapp.herokuapp.com/api/organizations/' + $scope.organizationService.selectedOrganization.identifier + '/sites/' + $scope.objectsSidebarService.selectedObject.identifier, {model: $scope.objectsSidebarService.selectedObject}).success(function (data) {
                if ("replaceModel" in data) {
                    $scope.objectsSidebarService.selectedObject = data.replaceModel;
                }
                if (data.state == "success")
                    $scope.succesSaveShow = true;
            });
        };

        //Edit a specific biin
        $scope.edit = function (index) {
            $scope.selectedBiin = index;
        };

        $scope.getSiteName = function (identifier) {
            var site = _.findWhere($scope.sites, {identifier: identifier});
            if (site) {
                return site.title1 + " " + site.title2;
            } else {
                return "//";
            }
        };

        $scope.getObjectName = function (identifier, type) {
            if (identifier && type) {
                if (type === "1") {
                    var el = _.findWhere($scope.elements, {elementIdentifier: identifier});
                    if (el)
                        return el.title;
                }
                else {
                    var sh = _.findWhere($scope.showcases, {identifier: identifier});
                    if (sh)
                        return sh.name;
                }
            }
            return "name not available"
        };

        $scope.removeObject = function (index) {
            $scope.biins[$scope.selectedBiin].objects.splice(index, 1);
        };

        //Save The Biin Objects Changes
        $scope.save = function () {
            if ($scope.wizardPosition == "1") {
                $http.put('https://qa-biinapp.herokuapp.com/api/venues/create', null, {
                    headers: {
                        name: $scope.biins[$scope.selectedBiin].venue,
                        orgidentifier: $scope.organizationId
                    }
                }).success(function () {
                    $http.post('https://qa-biinapp.herokuapp.com/api/biins/' + $scope.biins[$scope.selectedBiin].identifier + '/update', $scope.biins[$scope.selectedBiin]).success(function () {
                        console.log("success")
                    }).error(function (err) {
                        console.log(err);
                    });
                });
            } else {
                $http.post('https://qa-biinapp.herokuapp.com/api/biins/' + $scope.biins[$scope.selectedBiin].identifier + '/update', $scope.biins[$scope.selectedBiin]).success(function () {
                    console.log("success")
                }).error(function (err) {
                    console.log(err);
                });
            }
        };

        Organization.promise.then(function () {

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
                "<div class='col-md-12 leftInformationArea'>" +
                "<label class='moduleTitle'>{{item.name}}</label>" +
                "<localization></localization>"+
                "<p>{{item.status}}</p>" +
                "</div>";


            $scope.objectsSidebarService.template = $scope.sidebarTemplate;

            /**=============================================================================================================
             * Events Listeners
             *
             =============================================================================================================*/

            $scope.$on('$stateChangeStart', function () {
                $scope.objectsSidebarService.reset();
            });

            $scope.$on('organizationChanged', function () {
                $scope.organizationId = $scope.organizationService.selectedOrganization.identifier;
                $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/biins/').success(function (data) {
                    $scope.biins = data.data;
                    $scope.objectsSidebarService.setObjects(data.data);
                }).error(function (err) {
                    console.log(err);
                });
                //Get the List of Objects
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
                $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/elements/').success(function (data) {
                    $scope.elements = data.data.elements;
                    //Get the showcases
                    $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/showcases/').success(function (data) {
                        $scope.showcases = data.data;
                        $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/biins/').success(function (data) {
                            $scope.biins = data.data;
                            $scope.objectsSidebarService.setObjects(data.data);
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


        //Add an object to the objects collection
        $scope.saveObject = function (obj) {
            if (obj)
                if ('isNew' in obj) {
                    delete obj.isNew;
                    $scope.biins[$scope.selectedBiin].objects.push(obj);
                }
                else {
                }
            //$scope.biins.push(obj);
            //Todo Do the method to save the save the data
        };

        $scope.getVenues = function (val) {
            return $http.get('api/venues/search', {
                headers: {
                    regex: val,
                    orgidentifier: $scope.organizationId
                }
            }).then(function (response) {
                return response.data;
            });
        };

        //Modal to edit or create an Object
        $scope.biinObject = function (size, type, obj) {

            var modalInstance = $modal.open({
                templateUrl: 'partials/biinObjectModal',
                controller: 'objectController',
                size: size,
                resolve: {
                    selectedObj: function () {
                        if (type === 'create')
                            return {type: type};//name:$scope.sites[selectedIndex].title1,index:selectedIndex};
                        else
                            return {type: type, obj: obj};//name:$scope.sites[selectedIndex].title1,index:selectedIndex};
                    },
                    elements: function () {
                        return $scope.elements;
                    },
                    showcases: function () {
                        return $scope.showcases;
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
