/**=========================================================
 * Module: biins.controller.js
 * Controller for biins section
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('biins')
        .controller('BiinsController', BiinsController);

    BiinsController.$inject = ['$http', '$state', '$scope', '$translate', 'Authentication', 'Organization', 'ObjectsSidebar', 'Loading'];
    function BiinsController($http, $state, $scope, $translate, Authentication, Organization, ObjectsSidebar, Loading) {


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

            objectToSave.startTime = $scope.time.timeEnabled[0] + "";
            objectToSave.endTime = $scope.time.timeEnabled[1] + "";

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

            if(isNaN(parseFloat(objectClicked.startTime))) {
                $scope.time.timeEnabled[0] = 0;
            }else{
                $scope.time.timeEnabled[0] = parseFloat(objectClicked.startTime);
            }

            if(isNaN(parseFloat(objectClicked.endTime))) {
                $scope.time.timeEnabled[1] = 24;
            } else{
                $scope.time.timeEnabled[1] = parseFloat(objectClicked.endTime);
            }

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

        $scope.time = {};
        $scope.time.timeEnabled = [0,24];

        $scope.sitesAssigned = [];

        $scope.validatesValues = function( event, value){
            if(value && Array.isArray(value)){
                if(value[1]-value[0] <= 0.5 && value[1] == 24){
                    value[0] = 23.5;
                    value[1] = 24;
                } else if(value[1]-value[0] < 0.5){
                    value[1] = value[0] + 0.5;
                }
            }
        };

        $scope.ticks = [0,6,12,18,24];
        $scope.ticksText = ['12:00 AM','6:00 AM','12:00 PM','6:00 PM','12:00 AM'];

        $scope.labels = [
            "12:00 AM",
            "12:30 AM",
            "1:00 AM",
            "1:30 AM",
            "2:00 AM",
            "2:30 AM",
            "3:00 AM",
            "3:30 AM",
            "4:00 AM",
            "4:30 AM",
            "5:00 AM",
            "5:30 AM",
            "6:00 AM",
            "6:30 AM",
            "7:00 AM",
            "7:30 AM",
            "8:00 AM",
            "8:30 AM",
            "9:00 AM",
            "9:30 AM",
            "10:00 AM",
            "10:30 AM",
            "11:00 AM",
            "11:30 AM",
            "12:00 PM",
            "12:30 PM",
            "1:00 PM",
            "1:30 PM",
            "2:00 PM",
            "2:30 PM",
            "3:00 PM",
            "3:30 PM",
            "4:00 PM",
            "4:30 PM",
            "5:00 PM",
            "5:30 PM",
            "6:00 PM",
            "6:30 PM",
            "7:00 PM",
            "7:30 PM",
            "8:00 PM",
            "8:30 PM",
            "9:00 PM",
            "9:30 PM",
            "10:00 PM",
            "10:30 PM",
            "11:00 PM",
            "11:30 PM",
            "12:00 AM"];


        $scope.hourFormatter = function(value){
            if(Array.isArray(value)){
                return $scope.labels[value[0]*2] +" : "+ $scope.labels[value[1]*2] ;
            }else{
                return $scope.labels[value*2];
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
            $scope.time.timeEnabled = [0, 24];
        };

        $scope.create = function () {
            var titleText = $translate.instant("NOTICES.CREATING");
            swal({   title: titleText,  type: "info",   showConfirmButton: false });
            $http.put(ApplicationConfiguration.applicationBackendURL + 'api/notices/organizations/' + $scope.organizationId).success(function (data) {
                $scope.notices.push(data);
                $scope.objectsSidebarService.setObjects($scope.notices);
                $scope.objectsSidebarService.setSelectedObject(data);
                setTimeout(function(){
                    swal.close();
                },2000);
            }).error(function (err) {
                console.error(err);
            });
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


        $scope.deleteNotice = function(message, selectedObject) {
            var translatedTexts  = $translate.instant(["NOTICES.DELETE_TITLE","NOTICES.DELETE_CONFIRMATION"," NOTICES.DELETED","GENERIC.DELETE","GENERIC.CANCEL"]);

            swal({
                title: translatedTexts["NOTICES.DELETE_TITLE"],
                text: translatedTexts["NOTICES.DELETE_CONFIRMATION"],
                type: "warning",
                showCancelButton: true,
                cancelButtonText:translatedTexts["GENERIC.CANCEL"],
                confirmButtonColor: "#DD6B55",
                confirmButtonText: translatedTexts["GENERIC.DELETE"],
                showLoaderOnConfirm: true,
                closeOnConfirm: false
            }, function () {
                $scope.removeNoticeAt($scope.objectsSidebarService.objects.indexOf(selectedObject));
            });
        };

        //Remove element at specific position
        $scope.removeNoticeAt = function(index){
            var translatedTexts  = $translate.instant(["NOTICES.DELETED_TEXT","GENERIC.DELETED"]);
            //var elementId = $scope.objectsSidebarService.objects[index].elementIdentifier;
            var noticeId = $scope.objectsSidebarService.objects[index].identifier;
            $http.delete(ApplicationConfiguration.applicationBackendURL + 'api/notices/'+noticeId).success(function(data){
                    if($scope.objectsSidebarService.selectedObject==$scope.objectsSidebarService.objects[index]){
                        $scope.objectsSidebarService.selectedObject = null;
                    }
                    $scope.objectsSidebarService.objects.splice(index,1);
                    swal(translatedTexts["GENERIC.DELETED"], translatedTexts["NOTICES.DELETED_TEXT"], "success");
                }
            );
        };
    }

})();
