/**=========================================================
 * Module: users.client.controller.js
 * Controller of users
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('users')
        .controller('UsersController', UsersController);

    UsersController.$inject = ['$window', '$state',  '$scope', 'Loading', 'Organization', 'Authentication', '$translate', 'toaster', 'UsersOrg','GlobalFilters', '$timeout'];

    function UsersController($window, $state, $scope, Loading, Organization, Authentication, $translate, toaster, UsersOrg, GlobalFilters, $timeout) {
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

            getInitialData();
        }

        /**=============================================================================================================
         * Event Listeners
         =============================================================================================================*/

        $scope.$on('$stateChangeStart', function(){
            $scope.loadingService.isLoading = true;
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
                    $scope.users = users;
                    console.log(users);
                    $scope.loadingService.isLoading = false;
                });
            }
        }
        /*
         *Function to invite a new user
         * param type: {}, userToInvite
         */
        $scope.invite = function() {
            $scope.activeTab[0] = true;
        }

       /* Function to control the tabs (active)
        * param type: INT, index
        */
        $scope.clickTab = function(index) {
            $scope.activeTab[index] = true;
        };
    }
})();
