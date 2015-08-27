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
        .module('profile')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$http', '$state', '$scope', 'Authentication', 'toaster', '$location', 'Organization'];
    function ProfileController($http, $state, $scope, Authentication, toaster, $location, Organization) {
        var vm = this;
        $scope.organizationService = Organization;
        if (!Authentication.user) {
            $location.path('/');
        }
        $scope.saveInformation = function () {
            if (typeof($scope.profile) !== 'undefined' && isProfileDirty()) {//If is Profile Dirty
                $http.put('api/account', {model: $scope.profile}).success(function (data, status) {
                    if (status === 200) {
                        if (data.needToRelog)
                            window.location.href = '/auth/signout';
                        else
                            toaster.pop('success', '', 'Your information has been saved');
                    } else
                        toaster.pop('error', 'Error', 'Your information has not been saved');
                }).error(function () {
                    toaster.pop('error', 'Error', 'Your information has not been saved');
                });
            }
        };

        $scope.saveOrganization = function () {
            if ($scope.selectedOrganization >= 0 && !$scope.isAnalazingOrg) {
                if (isOrganizationDirty()) {
                    var currentOrganization = $scope.organizationService.organizationsList[$scope.selectedOrganization];
                    $scope.prevSaveOrganization = jQuery.extend({}, currentOrganization);
                    $scope.isAnalazingOrg = false;

                    $http.put('api/organization/' + currentOrganization.identifier, {model: currentOrganization}).success(function (data, status) {
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
        $scope.editOrganization = function (index) {
            $scope.selectedOrganization = index;
            $scope.prevSaveOrganization = jQuery.extend({}, $scope.organizationService.organizationsList[index]);
            //changeOrganizationToDefault();
            //$scope.clearValidations();
            //$scope.wizardPosition=1;
            //$scope.validate(true);
        };

        //Push a new organization in the list
        $scope.createOrganization = function () {
            //Get the Mayor from server
            $http.post('api/organization/').success(function (org, status) {
                if (status == 201 || status == 200) {
                    $scope.organizationService.organizationsList.push(org);
                    $scope.editOrganization($scope.organizationService.organizationsList.indexOf(org));
                } else {
                    displayErrorMessage(org, "Organizations Creation", status);
                }
            });
        };

        //Remove showcase at specific position
        $scope.removeOrganization = function (id, deferred) {
            $http.delete('api/organization/' + id).success(function (data) {
                    if (data.state == "success") {
                        $scope.organizationService.removeOrganization(id);
                        deferred.resolve();
                    }
                }
            );
        };


        //Indicate if an organization data is changed
        var isOrganizationDirty = function () {
            $scope.isAnalazingOrg = true;
            var propertiesToCheck = ["name", "brand", "description", "extraInfo"];
            var foundChange = false;
            if ($scope.prevSaveOrganization !== null) {
                for (var i = 0; i < propertiesToCheck.length && !foundChange; i++) {
                    foundChange = $scope.organizationService.organizationsList[$scope.selectedOrganization][propertiesToCheck[i]] !== $scope.prevSaveOrganization[propertiesToCheck[i]];
                }
            }
            return foundChange;

        };

        var isProfileDirty = function () {
            var propertiesToCheck = ["displayName", "lastName", "name", "phoneNumber"];
            //emails[0]
            return true;
        };

        $scope.$on('panel-remove', function (event, id, deferred) {
            $scope.removeOrganization(id, deferred);
        });

        var panelOrgDeleted = function () {
            console.warn('org deleted');
        };

        activate();

        ////////////////

        function activate() {
            $scope.authentication = Authentication;
            $http.get("/api/account").success(function (data) {
                $scope.profile = data.data;
            });
            $scope.editOrganization(0);
            $scope.$on('panel-remove', panelOrgDeleted);
        }
    }
})();
