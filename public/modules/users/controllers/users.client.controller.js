/**=========================================================
 * Module: users.client.controller.js
 * Controller of users
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('users')
        .controller('UsersController', UsersController);

    UsersController.$inject = ['$q', '$window', '$state',  '$scope', 'Loading', 'Organization', 'Authentication', '$translate', 'toaster', 'UsersOrg','GlobalFilters', '$timeout'];

    function UsersController($q, $window, $state, $scope, Loading, Organization, Authentication, $translate, toaster, UsersOrg, GlobalFilters, $timeout) {
        var user = this;

        /* Redirect to login if there is no user*/
        if (!Authentication.user) {
            $window.location = '/';
        }

        /* Running init function */
        init();

        /**=============================================================================================================
         * Init Function
         =============================================================================================================*/

        function init() {
            /* Initial Settings */
            $scope.loadingService = Loading;
            $scope.organizationService = Organization;
            $scope.globalFiltersService = GlobalFilters;
            /* Controlling active tabs */
            $scope.activeTab = [];
            // $scope.selectedOrganization = Organization.selectedOrganization;
            $scope.selectedOrganizationId = Organization.selectedOrganizationId;
            $scope.usersService = UsersOrg;
            $scope.currentUser = {};

            getInitialData();
        }

        /**=============================================================================================================
         * Event Listeners
         =============================================================================================================*/

        $scope.$on('$stateChangeStart', function(){
            $scope.loadingService.isLoading = true;
            console.log(user.myForm);
        });

        $scope.$on('organizationChanged',function(){
            $scope.loadingService.isLoading = true;
            /* Get data again, depending of the new organization */
            if($scope.selectedOrganizationId){
                getInitialData();
            }
        });

        /**=============================================================================================================
         * Functions
         =============================================================================================================*/
        /*
         *Function to get all the initial data need it to initialization of the module
         */
        function getInitialData() {
            if($scope.selectedOrganizationId){
                $scope.isLoading = true;
                $scope.usersService.getUsers().then(function(users) {
                    $scope.users = users.reverse();
                    console.log(users);
                    $scope.loadingService.isLoading = false;
                });
            }
        }
        /* Function to invite a new user */
        $scope.invite = function() {
            $scope.usersService.invite($scope.currentUser).then(function(response) {
                if(response && response.status==200){
                    return $scope.usersService.getUsers();
                } else {
                    return $q.reject('Some error occured');
                }
            }).then(function(users) {
                $scope.users = users.reverse();
                resetForm();
                $scope.activeTab[0] = true;
            });
        }

        /* Function that display the swal as a confirmation to remove user */
        $scope.removeUser = function(user) {
            var translatedTexts  = $translate.instant(["GENERIC.REMOVE_USER_TITLE","GENERIC.REMOVE_USER_CONFIRMATION","GENERIC.REMOVE","GENERIC.CANCEL"]);

            swal({
                title: translatedTexts["GENERIC.REMOVE_USER_TITLE"],
                text: translatedTexts["GENERIC.REMOVE_USER_CONFIRMATION"],
                type: "warning",
                showCancelButton: true,
                cancelButtonText:translatedTexts["GENERIC.CANCEL"],
                confirmButtonColor: "#DD6B55",
                confirmButtonText: translatedTexts["GENERIC.REMOVE"],
                showLoaderOnConfirm: true,
                closeOnConfirm: false
            }, function () {
                $scope.usersService.removeUser(user.accountIdentifier).then(function() {
                    var translatedTexts  = $translate.instant(["USER.DELETED_TEXT","GENERIC.REMOVED"]);
                    swal(translatedTexts["GENERIC.REMOVED"], translatedTexts["USER.DELETED_TEXT"], "success");
                    return $scope.usersService.getUsers();
                }).then(function(users) {
                    $scope.users = users.reverse();
                });
            });
        };
        
       /* Function to control the tabs (active)
        * param type: INT, index
        */
        $scope.clickTab = function(index) {
            $scope.activeTab[index] = true;
        };
        /* Function to reset form */
        function resetForm() {
            user.myForm.$setUntouched();
            user.myForm.$setPristine();
            $scope.currentUser = {};
        }
    }
})();
