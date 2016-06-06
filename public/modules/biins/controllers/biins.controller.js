/**=========================================================
 * Module: biins.controller.js
 * Controller for biins section
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('biins')
        .controller('BiinsController', BiinsController);

    BiinsController.$inject = ['$http', '$state', '$scope', '$uibModal', 'Authentication', 'Organization', 'ObjectsSidebar', 'Loading'];
    function BiinsController($http, $state, $scope, $modal, Authentication, Organization, ObjectsSidebar, Loading) {


        /**=============================================================================================================
         *  Functions
         =============================================================================================================*/

        $scope.objectsSidebarService = ObjectsSidebar;
        $scope.objectsSidebarService.enableAddButton = true;

        $scope.removeObject = function (index) {
            $scope.objectsSidebarService.selectedObject.objects.splice(index, 1);
            $scope.biins = $scope.objectsSidebarService.getObjects();
        };

        //Save The Biin Objects Changes
        $scope.save = function () {
            console.log($scope.objectsSidebarService.selectedObject);
            console.log($scope.days);
            console.log($scope.sitesAssigned);

            var objectToSave = $scope.objectsSidebarService.selectedObject;

            objectToSave.onMonday =  $scope.days.monday ? "1" : "0";
            objectToSave.onTuesday =  $scope.days.tuesday ? "1" : "0";
            objectToSave.onWednesday =  $scope.days.wednesday ? "1" : "0";
            objectToSave.onThursday =  $scope.days.thursday ? "1" : "0";
            objectToSave.onFriday =  $scope.days.friday ? "1" : "0";
            objectToSave.onSaturday =  $scope.days.saturday ? "1" : "0";
            objectToSave.onSunday =  $scope.days.sunday ? "1" : "0";

            objectToSave.startTime = ($scope.time.initial.getHours() + $scope.time.initial.getMinutes()/60) + "";
            objectToSave.endTime = ($scope.time.final.getHours() + $scope.time.final.getMinutes()/60) + "";

            var sitesToSave = $scope.sitesAssigned;

            var dataToSave = {};
            dataToSave.sites = sitesToSave;
            dataToSave.notice = objectToSave;



            $http.post(ApplicationConfiguration.applicationBackendURL + 'api/notices/organizations/' + $scope.organizationId,dataToSave).success(function(data){
                console.log("data was saved succesfully");
                $scope.sites = data.sites;
                $scope.sitesAssigned = [];

                for(var i = 0; i < $scope.sites.length; i++){
                    if($scope.sites[i].isReady == 1){
                        var isAssigned = false;
                        if($scope.sites[i].notices)
                            isAssigned = $scope.sites[i].notices.indexOf($scope.objectsSidebarService.selectedObject.identifier) > -1;
                        $scope.sitesAssigned.push({"isAssigned":isAssigned, site:$scope.sites[i]});
                    }
                }

            }).error(function(){
                console.log("data wasnt saved succesfully");
            })
        };

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
            "<div class='col-md-12 leftInformationArea'>"+
            "<label class='twoRowTitle'>{{item.name}}</label>"+
            "<label ng-if='item.isActive' class='twoRowSubtitle'>Activado</label>"+
            "<label ng-if='!item.isActive' class='twoRowSubtitle'>Desactivado</label>"+
            "</div>";
        $scope.objectsSidebarService.template = $scope.sidebarTemplate;
        $scope.loadingService = Loading;
        $scope.loadingService.isLoading = true;

        /**=============================================================================================================
         * Events Listeners
         *
         =============================================================================================================*/

        $scope.$on('$stateChangeStart', function () {
            $scope.loadingService.isLoading = true;
            $scope.objectsSidebarService.reset();
        });

        $scope.$on('organizationChanged', function () {
            $scope.objectsSidebarService.selectedObject = null;
            $scope.objectsSidebarService.objects = [];
            $scope.loadingService.isLoading = true;

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
                        $http.get(ApplicationConfiguration.applicationBackendURL + 'api/notices/organizations/' + $scope.organizationId).success(function (data) {
                            $scope.notices = data.data;
                            $scope.objectsSidebarService.setObjects(data.data);

                            var elementsInShowcase = [];
                            for (var i = 0; i < $scope.showcases.length; i++) {
                                var showcase = $scope.showcases[i];
                                elementsInShowcase = elementsInShowcase.concat(showcase.elements);
                            }

                            var elementsIdentifierInShowcase = _.pluck(elementsInShowcase,"elementIdentifier");
                            elementsIdentifierInShowcase = _.uniq(elementsIdentifierInShowcase);

                            $scope.elements = _.filter($scope.elements,function(element){
                                return elementsIdentifierInShowcase.indexOf(element.elementIdentifier) > -1;
                            });

                            $scope.loadingService.isLoading = false;
                        }).error(function (err) {
                            console.error(err);
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
            $scope.days.monday = objectClicked.onMonday == "1";
            $scope.days.tuesday = objectClicked.onTuesday == "1";
            $scope.days.wednesday = objectClicked.onWednesday == "1";
            $scope.days.thursday = objectClicked.onThursday == "1";
            $scope.days.friday = objectClicked.onFriday == "1";
            $scope.days.saturday = objectClicked.onSaturday == "1";
            $scope.days.sunday = objectClicked.onSunday == "1";

            var initialTime = new Date();
            if(!isNaN(parseFloat(objectClicked.startTime))) {
                var startTimeHour = parseInt(objectClicked.startTime.split(".")[0]);
                var startTimeMin =  Math.round((parseFloat(objectClicked.startTime)- startTimeHour) * 60);
                initialTime.setHours(startTimeHour);
                initialTime.setMinutes(startTimeMin);
            }else{
                initialTime.setHours(0);
                initialTime.setMinutes(0);
            }

            var finalTime = new Date();
            if(!isNaN(parseFloat(objectClicked.endTime))) {
                var endTimeHour = parseInt(objectClicked.endTime.split(".")[0]);
                var endTimeMin = Math.round((parseFloat(objectClicked.endTime)- endTimeHour) * 60);
                finalTime.setHours(endTimeHour);
                finalTime.setMinutes(endTimeMin);
            } else{
                finalTime.setHours(23);
                finalTime.setMinutes(59);
            }

            $scope.time.final = finalTime;
            $scope.time.initial = initialTime;

            $scope.sitesAssigned = [];


            if($scope.objectsSidebarService.selectedObject.elementIdentifier == "" && $scope.elements.length> 0){
                $scope.objectsSidebarService.selectedObject.elementIdentifier = $scope.elements[0].elementIdentifier;
            }

            for(var i = 0; i < $scope.sites.length; i++){
              if($scope.sites[i].isReady == 1){
                  var isAssigned = false;
                  if($scope.sites[i].notices)
                      isAssigned = $scope.sites[i].notices.indexOf($scope.objectsSidebarService.selectedObject.identifier) > -1;
                  $scope.sitesAssigned.push({"isAssigned":isAssigned, site:$scope.sites[i]});
              }
            }


        });

        $scope.$on("Biin: On Object Created", function () {
            $scope.create();
        });

        /**=============================================================================================================
         * Variables
         *
         =============================================================================================================*/

        //Init the the sites
        $scope.organizationId = $scope.organizationService.selectedOrganization.identifier;
        $scope.days = {
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false
        };
        $scope.isMeridian = true;

        $scope.hstep = 1;
        $scope.mstep = 1;

        $scope.time = {};
        $scope.time.final = new Date();
        $scope.time.initial = new Date();

        var d = new Date();
        d.setHours( 0,0,0,0);
        $scope.initialMin = d;

        d = new Date();
        d.setHours( 23,58,0,0);
        $scope.initialMax = d;

        d = new Date();
        d.setHours( 0,1,0,0);
        $scope.finalMin = d;

        d = new Date();
        d.setHours( 23,59,59,999);
        $scope.finalMax = d;

        $scope.sitesAssigned = [];


        $scope.checkTimeValues = function(){
            var initialHour = $scope.time.initial.getHours();
            var initialMin = $scope.time.initial.getMinutes();
            var finalHour = $scope.time.final.getHours();
            var finalMin = $scope.time.final.getMinutes();

            if(initialHour >= finalHour  || ( initialHour == finalHour && initialMin >= finalMin)){
                var d = new Date();
                d.setHours(initialHour,initialMin + 1);
                $scope.time.final = d;
            }
        };


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
                    $http.get(ApplicationConfiguration.applicationBackendURL + 'api/notices/organizations/' + $scope.organizationId).success(function (data) {
                        $scope.notices = data.data;
                        $scope.objectsSidebarService.setObjects(data.data);

                        var elementsInShowcase = [];
                        for (var i = 0; i < $scope.showcases.length; i++) {
                            var showcase = $scope.showcases[i];
                            elementsInShowcase = elementsInShowcase.concat(showcase.elements);
                        }

                        var elementsIdentifierInShowcase = _.pluck(elementsInShowcase,"elementIdentifier");
                        elementsIdentifierInShowcase = _.uniq(elementsIdentifierInShowcase);

                        $scope.elements = _.filter($scope.elements,function(element){
                            return elementsIdentifierInShowcase.indexOf(element.elementIdentifier) > -1;
                        });

                        $scope.loadingService.isLoading = false;
                    }).error(function (err) {
                        console.error(err);
                    });
                }).error(function (err) {
                    console.error(err);
                });
            }).error(function (err) {
                console.error(err);
            });
        }).error(function (err) {
            console.error(err);
        });


        $scope.setAllDay = function () {
            var newInitialTime = new Date();
            newInitialTime.setHours(0,0,0,0);
            $scope.time.initial = newInitialTime;

            var newFinalTime = new Date();
            newFinalTime.setHours(23,59,0,0);
            $scope.time.final = newFinalTime;
        };

        $scope.create = function () {
            $http.put(ApplicationConfiguration.applicationBackendURL + 'api/notices/organizations/' + $scope.organizationId).success(function (data) {
                $scope.notices.push(data);
                $scope.objectsSidebarService.setObjects($scope.notices);
                $scope.objectsSidebarService.setSelectedObject(data);
            }).error(function (err) {
                console.error(err);
            });
        };

        $scope.convertTime = function (time) {
            var hours = parseInt(time);
            var min = ( parseFloat(time) - hours ) * 60;
            var hoursString = hours < 10 ? "0" + hours : "" + hours;
            var minString = min < 10 ? "0" + min : "" + min;
            return hoursString + ":" + minString;
        };

        $scope.enableAllDays = function () {
            $scope.days = {
                monday: true,
                tuesday: true,
                wednesday: true,
                thursday: true,
                friday: true,
                saturday: true,
                sunday: true
            };
        };

        $scope.disableAllDays = function () {
            $scope.days = {
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false,
                sunday: false
            };
        };

        $scope.enableNoticeInAllSites = function(){
            for (var i = 0; i < $scope.sitesAssigned.length; i++) {
                $scope.sitesAssigned[i].isAssigned = true;
            }
        };

        $scope.disableNoticeInAllSites = function(){
            for (var i = 0; i < $scope.sitesAssigned.length; i++) {
                $scope.sitesAssigned[i].isAssigned = false;
            }
        };

        $scope.toggleIsActive = function(){
            $scope.objectsSidebarService.selectedObject.isActive = !$scope.objectsSidebarService.selectedObject.isActive;
        };
    }

})();
