/**=========================================================
 * Module: access-login.js
 * Demo for login api
 =========================================================*/

(function() {
    'use strict';
      
    angular
        .module('biinUsers')
        .controller('LoginFormController', LoginFormController);

    LoginFormController.$inject = ['$http', '$state','$location','$scope','$translate','Authentication','Organization'];

    function LoginFormController($http, $state,$location,$scope,$translate,Authentication,Organization) {
        var vm = this;
        $scope.authentication = Authentication;

        if ($scope.authentication.user) {
            $location.path('/dashboard');
        }

        activate();

        ////////////////

        function activate() {
            // Bind here all data from the form
            vm.account = {};
            // Place the message if something goes wrong
            vm.authMsg = '';

            vm.login = function() {
                vm.authMsg = '';

                if(vm.loginForm.$valid) {
                    $http
                    // .post(ApplicationConfiguration.applicationBackendURL + 'api/loginCMS', {username: vm.account.email, password: vm.account.password})
                    .post('api/account/login', {email: vm.account.email, password: vm.account.password})
                    .then(function(response) {
                    // Assumes if ok, response is an object with some data, if not, a string with error
                    // Customize according to your api
                    if ( !response.data.account ) {
                        vm.authMsg = $translate('LOGIN.INVALID_CREDENTIALS');
                    }else{
                        $scope.authentication.user = response.data.account;
                        Organization.getSelectedOrganization().then(function() {
                            Organization.getOrganizations().then( function() {
                                $state.go('app.dashboard');
                            });
                        });
                    }
                    }, function(reason) {
                        if (reason.status == "401") {
                            vm.authMsg = $translate.instant('LOGIN.INVALID_CREDENTIALS');
                        } else {
                            vm.authMsg = $translate.instant('SERVER_ERROR');
                        }
                        $state.go('page.login');
                    });
                }else {
                // Set as dirty if the user click directly to login so we show the validation messages
                /*jshint -W106*/
                vm.loginForm.account_email.$dirty = true;
                vm.loginForm.account_password.$dirty = true;
                }
            };
        }
    }
})();
