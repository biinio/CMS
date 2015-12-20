/**
 * Created by Ivan on 8/19/15.
 */
/**=========================================================
 * Module: profile.js
 * Profile management for biin
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('organization')
        .controller('OrganizationController', OrganizationController);

    OrganizationController.$inject = ['$http', '$state', '$scope', 'Authentication', 'toaster', '$location', 'Organization','ObjectsSidebar'];
    function OrganizationController($http, $state, $scope, Authentication, toaster, $location, Organization,ObjectsSidebar) {
        var vm = this;
        $scope.objectsSidebarService = ObjectsSidebar;
        $scope.organizationService = Organization;

        /**=============================================================================================================
         * ObjectsSidebar Configuration
         =============================================================================================================*/

        $scope.sidebarTemplate =
            "<div class='col-md-3 thumbListImage'>" +
            "<img ng-if='item.elements.length == 0  || item.elements[0].media.length == 0 ' src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDAiIGhlaWdodD0iMTQwIj48cmVjdCB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjcwIiB5PSI3MCIgc3R5bGU9ImZpbGw6I2FhYTtmb250LXdlaWdodDpib2xkO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtZmFtaWx5OkFyaWFsLEhlbHZldGljYSxzYW5zLXNlcmlmO2RvbWluYW50LWJhc2VsaW5lOmNlbnRyYWwiPjE0MHgxNDA8L3RleHQ+PC9zdmc+' alt=''/>" +
            "<img ng-if='item.media.length>0' ng-src='{{item.media[0].url}}'/>" +
            "</div>" +
            "<div class='col-md-9 leftInformationArea'>" +
            "<label class='moduleTitle'>{{item.name}}</label>" +
            "</div>";
        $scope.objectsSidebarService.template = $scope.sidebarTemplate;
        $scope.objectsSidebarService.setObjects($scope.organizationService.organizationsList);

        /**=============================================================================================================
         * Events Listeners
         *
         =============================================================================================================*/


        $scope.$on('$stateChangeStart', function () {
            $scope.objectsSidebarService.reset();
        });

        $scope.$on('organizationChanged', function () {

        });

        $scope.$on("Biin: On Object Clicked", function (event, objectClicked) {
            $scope.editOrganization();
        });

        $scope.$on("Biin: On Object Created", function () {
            $scope.createOrganization();
        });

        $scope.$on("Biin: On Object Deleted", function (event, index) {
            $scope.removeOrganization(index);
        });

        $scope.$on('changeOrganizationImage',function(scope,newPicture){
            $scope.objectsSidebarService.selectedObject.media[0]=newPicture;
        });

        if (!Authentication.user) {
            $location.path('/');
        }

        $scope.saveOrganization = function () {
            if (!$scope.isAnalazingOrg) {
                if (isOrganizationDirty()) {
                    var currentOrganization = $scope.objectsSidebarService.selectedObject;
                    $scope.prevSaveOrganization = jQuery.extend({}, currentOrganization);
                    $scope.isAnalazingOrg = false;

                    currentOrganization.accountIdentifier = Authentication.user.accountIdentifier;
                    currentOrganization.isDeleted = 0;

                    $http.post(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + currentOrganization.identifier, {model: currentOrganization}).success(function (data, status) {
                        if (status === 200) {
                            $scope.succesSaveShow = true;
                        } else
                            $scope.errorSaveShow = true;
                    });
                }
                $scope.isAnalazingOrg = false;
            }
        };

        //Edit an site
        $scope.editOrganization = function () {
            $scope.prevSaveOrganization = jQuery.extend({}, $scope.objectsSidebarService.selectedObject);
        };

        //Push a new organization in the list
        $scope.createOrganization = function () {
            //Get the Mayor from server

            $http.put(ApplicationConfiguration.applicationBackendURL +'api/organizations/' + Authentication.user.accountIdentifier).success(function (org, status) {
                if (status == 201 || status == 200) {
                    $scope.organizationService.organizationsList.push(org);
                    //$scope.objectsSidebarService.objects.push(org);
                    $scope.objectsSidebarService.selectedObject = org;
                } else {
                    displayErrorMessage(org, "Organizations Creation", status);
                }
            });
        };


        // Confirm before deleting organization
        $scope.deleteOrganization = function(message, selectedObject) {
            if (confirm(message)) {
                $scope.removeOrganization($scope.objectsSidebarService.objects.indexOf(selectedObject));
            }
        };

        //Remove showcase at specific position
        $scope.removeOrganization = function (index) {
            var id = $scope.objectsSidebarService.objects[index].identifier;
            $http.delete(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + id).success(function (data) {
                $scope.organizationService.removeOrganization(id);
                $scope.objectsSidebarService.objects.splice(index,1);
                /*if($scope.objectsSidebarService.selectedObject.identifier == id){
                    $scope.objectsSidebarService.selectedObject = null;
                }*/
            });
        };


        //Indicate if an organization data is changed
        var isOrganizationDirty = function () {
            $scope.isAnalazingOrg = true;
            var propertiesToCheck = ["name", "brand", "description", "extraInfo"];
            var foundChange = false;
            if ($scope.prevSaveOrganization !== null) {
                for (var i = 0; i < propertiesToCheck.length && !foundChange; i++) {
                    foundChange = $scope.objectsSidebarService.selectedObject[propertiesToCheck[i]] !== $scope.prevSaveOrganization[propertiesToCheck[i]];
                }
            }
            return foundChange;
        };

        activate();

        ////////////////

        function activate() {
            $scope.authentication = Authentication;
            $scope.editOrganization(0);
        }
    }
})();
