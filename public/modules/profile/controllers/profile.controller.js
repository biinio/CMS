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

    ProfileController.$inject = ['$http', '$window', '$scope', 'Authentication', 'toaster', '$location', 'Organization','Loading', 'ObjectsSidebar'];
    function ProfileController($http, $window, $scope, Authentication, toaster, $location, Organization, Loading, ObjectsSidebar) {
        var vm = this;
        $scope.organizationService = Organization;
        $scope.objectsSidebarService = ObjectsSidebar;

        if (!Authentication.user) {
            $window.location = '/';
        }
        $scope.loadingService = Loading;
        $scope.loadingService.isLoading = true;

        $scope.$on('$stateChangeStart', function(){
            $scope.loadingService.isLoading = true;
            $scope.objectsSidebarService.reset();
        });

        $scope.saveInformation = function () {
            if (typeof($scope.profile) !== 'undefined' && isProfileDirty()) {//If is Profile Dirty
                $http.put('api/account', {model: $scope.profile}).success(function (data, status) {
                    if (status === 200) {
                        if (data.needToRelog)
                            window.location.href = '/';
                        else{
                            $scope.profileCopy = $.extend(true,{},$scope.profile);
                            toaster.pop('success', '', 'Your information has been saved');
                        }
                    } else
                        toaster.pop('error', 'Error', 'Your information has not been saved');
                }).error(function () {
                    toaster.pop('error', 'Error', 'Your information has not been saved');
                });
            }
        };

        var isProfileDirty = function () {
            return !_.isEqual($scope.profile, $scope.profileCopy);
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
                $scope.profileCopy = $.extend(true,{},data.data);
                $scope.loadingService.isLoading = false;
            });
        }
    }
})();
