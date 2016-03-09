/**=========================================================
 * Module: showcases.controller.js
 * controller for the showcases page
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('showcases')
        .controller('ShowcasesController', ShowcasesController);

    ShowcasesController.$inject = ['$http', '$scope', 'Authentication', 'Organization', 'ObjectsSidebar','ElementsService','BiinsService','Loading'];
    function ShowcasesController($http, $scope, Authentication, Organization, ObjectsSidebar,ElementsService,BiinsService,Loading) {
        activate();

        ////////////////

        function activate() {
            $scope.authentication = Authentication;
            $scope.organizationService = Organization;
            $scope.objectsSidebarService = ObjectsSidebar;
        }
        $scope.loadingService = Loading;
        $scope.loadingService.isLoading = true;



        /**=============================================================================================================
         * ObjectsSidebar Configuration
         =============================================================================================================*/

        $scope.sidebarTemplate =
            "<div class='col-md-3 thumbListImage'>" +
            "<img ng-if='item.elements.length == 0  || item.elements[0].media.length == 0 ' src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDAiIGhlaWdodD0iMTQwIj48cmVjdCB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjcwIiB5PSI3MCIgc3R5bGU9ImZpbGw6I2FhYTtmb250LXdlaWdodDpib2xkO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtZmFtaWx5OkFyaWFsLEhlbHZldGljYSxzYW5zLXNlcmlmO2RvbWluYW50LWJhc2VsaW5lOmNlbnRyYWwiPjE0MHgxNDA8L3RleHQ+PC9zdmc+' alt=''/>" +
            "<img ng-if='item.elements[0].media.length>0' ng-src='{{item.elements[0].media[0].url}}'/>" +
            "</div>" +
            "<div class='col-md-9 leftInformationArea'>" +
            "<label class='oneRowTitle'>{{item.name}}</label>" +
            "</div>";
        $scope.objectsSidebarService.template = $scope.sidebarTemplate;
        $scope.objectsSidebarService.isHidden = false;

        /**=============================================================================================================
         * Events Listeners
         *
         =============================================================================================================*/

        $scope.$on('$stateChangeStart', function(){
            $scope.objectsSidebarService.reset();
            $scope.loadingService.isLoading = false;
        });

        $scope.$on('organizationChanged', function () {
            //Get list of showcases
            $http.get(ApplicationConfiguration.applicationBackendURL +'api/organizations/' + $scope.organizationService.selectedOrganization.identifier + '/showcases').success(function (data) {
                $scope.objectsSidebarService.setObjects(data.data);
                $scope.objectsSidebarService.loadedInformation = true;
                $scope.showcasePrototype = data.prototypeObj;
                $scope.showcasePrototypeBkp = $.extend(true, {}, data.prototypeObj);
            });

            $http.get(ApplicationConfiguration.applicationBackendURL +'api/organizations/' + $scope.organizationService.selectedOrganization.identifier + '/sites').success(function (data) {
                $scope.sites = data.data.sites;
                $scope.oldSitesData = $.extend(true,[],data.data.sites);
                $scope.sitesBooleanArray = [];
                for(var i= 0; i < $scope.sites.length; i++){
                    $scope.sitesBooleanArray.push(false);
                }
            });

            //Get the List of Elements
            ElementsService.getList($scope.organizationService.selectedOrganization.identifier).then(function (promise) {
                $scope.elements = promise.data.data.elements;
            });

            //Get the List of Biins
            BiinsService.getList($scope.organizationService.selectedOrganization.identifier).then(function(promise){
                $scope.biinSite = promise.data.data;
            });
        });

        $scope.$on("Biin: On Object Clicked", function (event, objectClicked) {
            $scope.sitesBooleanArray = [];
            for(var i= 0; i < $scope.sites.length; i++){
                $scope.sitesBooleanArray.push($scope.isShowcaseAssigned($scope.sites[i],objectClicked));
            }
        });

        $scope.$on("Biin: On Object Created", function () {
            $scope.create();
        });

        /**=============================================================================================================
         * Variables
         =============================================================================================================*/
        $scope.slider1 = '50';

        /**=============================================================================================================
         * Self called functions
         =============================================================================================================*/
        //Get list of showcases
        $http.get(ApplicationConfiguration.applicationBackendURL +'api/organizations/' + $scope.organizationService.selectedOrganization.identifier + '/showcases').success(function (data) {
            $scope.objectsSidebarService.setObjects(data.data);
            $scope.showcasePrototype = data.prototypeObj;
            $scope.showcasePrototypeBkp = $.extend(true, {}, data.prototypeObj);
            $scope.loadingService.isLoading = false;
        });

        $http.get(ApplicationConfiguration.applicationBackendURL +'api/organizations/' + $scope.organizationService.selectedOrganization.identifier + '/sites').success(function (data) {
            $scope.sites = data.data.sites;
            $scope.oldSitesData = $.extend(true,[],data.data.sites);
            $scope.sitesBooleanArray = [];
            for(var i= 0; i < $scope.sites.length; i++){
                $scope.sitesBooleanArray.push(false);
            }
        });

        //Get the List of Elements
        ElementsService.getList($scope.organizationService.selectedOrganization.identifier).then(function (promise) {
            $scope.elements = promise.data.data.elements;
        });

        //Get the List of Biins
        BiinsService.getList($scope.organizationService.selectedOrganization.identifier).then(function(promise){
            $scope.biinSite = promise.data.data;
        });



        /**=============================================================================================================
         *  Functions
         =============================================================================================================*/


        //Push a new showcase in the list
        $scope.create = function () {
            //Create a new Showcase
            $http.post(ApplicationConfiguration.applicationBackendURL +'api/organizations/' + $scope.organizationService.selectedOrganization.identifier + "/showcases").success(function (showcase, status) {
                if (status == 201) {
                    $scope.objectsSidebarService.objects.push(showcase);
                }
            });

        };

        $scope.deleteShowcase = function(message, selectedObject) {
            if (confirm(message)) {
                $scope.removeShowcaseAt($scope.objectsSidebarService.objects.indexOf(selectedObject));
            }

        };

        //Remove showcase at specific position
        $scope.removeShowcaseAt = function (index) {
            if ($scope.objectsSidebarService.selectedObject == $scope.objectsSidebarService.objects[index]) {
                $scope.objectsSidebarService.selectedObject = null;
            }

            var showcaseId = $scope.objectsSidebarService.objects[index].identifier;
            $scope.objectsSidebarService.objects.splice(index, 1);
            $http.delete(ApplicationConfiguration.applicationBackendURL +'api/organizations/' + $scope.organizationService.selectedOrganization.identifier + '/showcases/' + showcaseId).success(function (data) {
                    if (data.state == "success") {
                        //Todo: implement a pull of messages
                    }
                }
            );

        };


        $scope.hasValidElements = function(selectedShowcase) {
            var validElement = _.findWhere(selectedShowcase, {isReady: 1});
            return !!validElement;
        };

        //Check min data has been filled
        $scope.hasMissingData = function() {

            // Don't do anything if there is no selected element
            if ($scope.objectsSidebarService.selectedObject == null)
                return;

            var missingMinData = false;

            //Check if required data is ready for app
            if ($scope.objectsSidebarService.selectedObject.name == null) {
                $scope.objectsSidebarService.selectedObject.name = "";
                missingMinData = true;
            } else if ($scope.objectsSidebarService.selectedObject.name.trim() === ''){
                missingMinData = true;
            }

            if ($scope.objectsSidebarService.selectedObject.elements.length === 0){
                missingMinData = true;
            } else if (!$scope.hasValidElements($scope.objectsSidebarService.selectedObject.elements)) {
                missingMinData = true;
            }

            return missingMinData;
        };

        //Save detail model object
        $scope.save = function () {


            //save sites
            var _idUsed = [];
            for(var i = 0; i< $scope.sites.length; i++){

                for(var j = 0; j<$scope.sites[i].showcases.length;j++){
                    var showcaseIdentifier = $scope.sites[i].showcases[j].showcaseIdentifier;
                    var elements = [];
                    var currentShowcaseObject = _.find($scope.objectsSidebarService.objects,function(showcase){
                        return showcase.identifier == showcaseIdentifier;
                    });
                    if(currentShowcaseObject){
                        for(var k = 0; k < currentShowcaseObject.elements.length; k++) {
                            elements.push({identifier:currentShowcaseObject.elements[k].elementIdentifier});
                        }
                    }
                    $scope.sites[i].showcases[j].elements=elements;
                }

                var modifiedSiteData = $scope.sites[i];
                var oldSiteData = $scope.oldSitesData[i];
                //If it is a new assigned showcase there is nothing much to do with the _id
                var newAssignedShowcases = _.filter(modifiedSiteData.showcases,function(showcase){
                    return _.find(oldSiteData.showcases,function(oldShowcase){
                        return showcase.showcaseIdentifier == oldShowcase.showcaseIdentifier;
                    }) == null;
                });
                //This showcases have to check if there are new or old elements assigned
                var alreadyAssignedShowcases = _.filter(modifiedSiteData.showcases,function(showcase){
                    return _.find(oldSiteData.showcases,function(oldShowcase){
                            return showcase.showcaseIdentifier == oldShowcase.showcaseIdentifier;
                        }) != null;
                });

                for(j = 0; j< alreadyAssignedShowcases.length;j++){
                    var currentShowcase = alreadyAssignedShowcases[j];
                    var oldShowcaseData = _.find(oldSiteData.showcases,function(showcase){
                       return showcase.showcaseIdentifier == currentShowcase.showcaseIdentifier;
                    });
                    for(k=0;k<currentShowcase.elements.length;k++){
                        var oldElement = _.find(oldShowcaseData.elements,function(element){
                            return currentShowcase.elements[k].identifier == element.identifier;
                        });
                        if(oldElement){
                            currentShowcase.elements[k]._id = oldElement._id;
                            _idUsed.push(oldElement._id);
                        }
                    }
                    alreadyAssignedShowcases[j] = currentShowcase;
                }
                var validatedShowcases = alreadyAssignedShowcases.concat(newAssignedShowcases);
                validatedShowcases = _.sortBy(validatedShowcases,function(showcase){
                    return _.findIndex(modifiedSiteData.showcases,function(originalShowcase){
                        return originalShowcase.showcaseIdentifier == showcase.showcaseIdentifier;
                    });
                });
                console.log("Already Assigned of site: " + modifiedSiteData.title + " lenght: " + alreadyAssignedShowcases.length);
                console.log("New Assigned of site: " + modifiedSiteData.title + " lenght: " + newAssignedShowcases.length);

                modifiedSiteData.showcases = validatedShowcases;
                $scope.sites[i] = modifiedSiteData;
            }

            //removing biins that identifier was removed
            _idUsed = _.uniq(_idUsed);
            for(i = 0; i< $scope.biinSite.length;i++){
                var biinToCheck = $scope.biinSite[i];
                biinToCheck.objects = _.filter(biinToCheck.objects,function(object){
                    return object.objectType != "1" || _.contains(_idUsed, object.identifier)
                });
                $scope.biinSite[i] = biinToCheck;
            }

            if ($scope.hasMissingData()) {
                $scope.objectsSidebarService.selectedObject.isReady = 0;
            } else {
                $scope.objectsSidebarService.selectedObject.isReady = 1;
            }

            $scope.objectsSidebarService.selectedObject.isDeleted = 0;

            $http.put(ApplicationConfiguration.applicationBackendURL +'api/showcases/' + $scope.objectsSidebarService.selectedObject.identifier, {model: $scope.objectsSidebarService.selectedObject}).success(function (data) {
                if ("replaceModel" in data) {
                    $scope.objectsSidebarService.selectedObject = data.replaceModel;
                    $scope.showcasePrototype = $.extend(true, {}, $scope.showcasePrototypeBkp);
                }
            });
            $http.post(ApplicationConfiguration.applicationBackendURL +'api/organizations/' + $scope.organizationService.selectedOrganization.identifier + '/site/showcases', {
                model: {
                    identifier: $scope.organizationService.selectedOrganization.identifier,
                    sites: $scope.sites
                }
            }).success(function (data, status) {
                $scope.sites = data.sites;
                $scope.oldSitesData = $.extend(true,[],data.sites);
            });

            $http.post(ApplicationConfiguration.applicationBackendURL +'api/organizations/' + $scope.organizationService.selectedOrganization.identifier + '/biins/showcases', {
                model: {
                    biins: $scope.biinSite
                }
            }).success(function (data, status) {

            });
        };


        $scope.filteredElements = function ( element ) {
            var index = -1;
            for(var i = 0; i < $scope.objectsSidebarService.selectedObject.elements.length; i++){
                if($scope.objectsSidebarService.selectedObject.elements[i].elementIdentifier == element.elementIdentifier){
                    index = i;
                    break;
                }
            }
            return  index == -1;
        };




        //Remove an element of a Showcase
        $scope.removeElementAt = function (index) {
            $scope.objectsSidebarService.selectedObject.elements.splice(index, 1);
        };

        //Get the first element by position
        $scope.getFirstElementByPosition = function (element) {
            var foundPosition = 0;
            if (element.objects.length === 1)
                return element.objects[0];
            else {
                var foundFirst = false;
                for (var i = 0; i < element.objects.length && foundFirst === false; i++) {
                    if (eval(element.objects[i].position) === 1) {
                        foundFirst = true;
                        foundPosition = i;
                    }
                }
            }
            return element.objects[foundPosition];
        };

        $scope.isShowcaseAssigned = function( site, showcase ){
            var index = -1;
            for (var i = 0; i < site.showcases.length; i++) {
                if(site.showcases[i].showcaseIdentifier == showcase.identifier)
                {
                    index = i;
                    break;
                }
            }
            if( index > -1)
            {
                return "active";
            }
            return "";

        };

        $scope.sortShowcases = function(site ,showcase){
            return function(showcase){
                var index = -1;
                for (var i = 0; i < site.showcases.length; i++) {
                    if(site.showcases[i].showcaseIdentifier == showcase.identifier)
                    {
                        index = i;
                        break;
                    }
                }
                if(index > -1)
                {
                    return index;
                }
                else
                {
                    return site.showcases.length + $scope.objectsSidebarService.objects.indexOf(showcase);
                }}
        };

        $scope.setShowcaseAssigned = function ( site, showcase ) {
            var index = -1;
            for (var i = 0; i < site.showcases.length; i++) {
                if(site.showcases[i].showcaseIdentifier == showcase.identifier)
                {
                    index = i;
                    break;
                }
            }
            if( index > -1)
            {
                site.showcases.splice(index,1);
            }
            else
            {
                site.showcases.push({showcaseIdentifier:showcase.identifier});
            }
        };

        $scope.moveShowcaseDown = function ( site, showcase ) {
            var index;
            for (var i = 0; i < site.showcases.length; i++) {
                if(site.showcases[i].showcaseIdentifier == showcase.identifier)
                {
                    index = i;
                    break;
                }
            }
            if(index+1 < site.showcases.length){
                site.showcases.splice(index,1);
                site.showcases.splice(index+1,0,{showcaseIdentifier:showcase.identifier});
            }
        };

        $scope.moveShowcaseUp = function ( site, showcase ) {
            var index;
            for (var i = 0; i < site.showcases.length; i++) {
                if(site.showcases[i].showcaseIdentifier == showcase.identifier)
                {
                    index = i;
                    break;
                }
            }
            if(index >= 1){
                site.showcases.splice(index,1);
                site.showcases.splice(index-1,0,{showcaseIdentifier:showcase.identifier});
            }
        }
    }
})();
