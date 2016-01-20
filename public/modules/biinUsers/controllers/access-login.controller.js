/**=========================================================
 * Module: access-login.js
 * Demo for login api
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('biinUsers')
        .controller('LoginFormController', LoginFormController);

    LoginFormController.$inject = ['$http', '$state','$location','$scope','Authentication','Organization'];
    function LoginFormController($http, $state,$location,$scope,Authentication,Organization) {
        var vm = this;
        $scope.authentication = Authentication;

        if ($scope.authentication.user) {
            $location.path('/dashboard');
        }

        activate();

        ////////////////

        function activate() {
          // bind here all data from the form
          vm.account = {};
          // place the message if something goes wrong
          vm.authMsg = '';

          vm.login = function() {
            vm.authMsg = '';

            if(vm.loginForm.$valid) {

              $http
                .post('api/account/login', {email: vm.account.email, password: vm.account.password})
                .then(function(response) {
                  // assumes if ok, response is an object with some data, if not, a string with error
                  // customize according to your api
                  if ( !response.data.account ) {
                    vm.authMsg = 'Incorrect credentials';
                  }else{
                      $scope.authentication.user = response.data.account;
                      Organization.getSelectedOrganization().then(function() {
                          Organization.getOrganizations().then( function() {
                              $state.go('app.dashboard');
                          });
                      });

                  }
                }, function(reason) {
                      console.log(reason);
                      if (reason.status == "401") {
                          vm.authMsg = 'Incorrect credentials';
                      } else {
                          vm.authMsg = 'Server Request Error';
                      }
                      $state.go('page.login');
                });
            }
            else {
              // set as dirty if the user click directly to login so we show the validation messages
              /*jshint -W106*/
              vm.loginForm.account_email.$dirty = true;
              vm.loginForm.account_password.$dirty = true;
            }
          };
        }


    }
})();
