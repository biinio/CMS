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

    ProfileController.$inject = ['$http', '$state', '$scope', 'Authentication', 'toaster', '$location', 'Organization','Loading'];
    function ProfileController($http, $state, $scope, Authentication, toaster, $location, Organization,Loading) {
        var vm = this;
        $scope.organizationService = Organization;
        if (!Authentication.user) {
            $location.path('/');
        }
        $scope.loadingService = Loading;
        $scope.loadingService.isLoading = true;

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

        var isProfileDirty = function () {
            var propertiesToCheck = ["displayName", "lastName", "name", "phoneNumber"];
            //emails[0]
            return true;
        };

        $scope.$on('changeProfileImage', function(scope,image){
            $scope.profile.profilePhoto=image+ '?' + new Date().getTime();

            //Apply the changes
            $scope.$digest();
            $scope.$apply();
        });

        activate();

        ////////////////

        function activate() {
            $scope.authentication = Authentication;
            $http.get("/api/account").success(function (data) {
                $scope.profile = data.data;
                $scope.loadingService.isLoading = false;
            });
        }
    }
})();
