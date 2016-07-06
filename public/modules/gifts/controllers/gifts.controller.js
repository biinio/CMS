/**=========================================================
 * Module: gifts.controller.js
 * Controller of gifts
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('gifts')
        .controller('GiftsController', GiftsController);

    GiftsController.$inject = ['$http', '$scope', 'Loading', 'ElementsService', 'Organization', 'ObjectsSidebar'];

    function GiftsController($http, $scope, Loading, ElementsService, Organization, ObjectsSidebar) {

        function init() {
            //----Services needed----//
            //Loading Service
            $scope.loadingService = Loading;
            //Organization Service
            $scope.organizationService = Organization;
            //Objects Sidebar Service
            $scope.objectsSidebarService = ObjectsSidebar;

            //----Variables----//
            //Ready to fill
            $scope.ready = false;
            //State of loading screen
            $scope.elements = [];
            $scope.loadingService.isLoading = false;
            //Gift Object
            $scope.objectsSidebarService.selectedObject = {};
            //Default bonus period state
            $scope.objectsSidebarService.selectedObject.bonusPeriodState = '0';
            //Current Date
            $scope.currentDate = new Date();
            //Draggable Properties
            $scope.organizationId = $scope.organizationService.selectedOrganization.identifier;

            //----Functions----//
            //Get the List of Elements
            $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/readyElements/').success(function (data) {
                $scope.products = data.data.elements;
            });
        }

        // Broadcast - On functions
        $scope.$on("Biin: On Object Created", function(){
            $scope.create();
        });

        //Routes (Main tasks)
        //Create a gift
        $scope.create = function(){
            console.log('Hola');
            // var titleText = $translate.instant("GIFT.CREATING");
            // swal({   title: titleText,  type: "info",   showConfirmButton: false });
            // $http.post(ApplicationConfiguration.applicationBackendURL + 'api/organizations/'+$scope.organizationService.selectedOrganization.identifier+"/gifts").success(function(gift,status){
            //     if(status == 201){
            //         console.log("Éxito");
            //     }else{
            //         displayErrorMessage(gift,"Element Creation",status);
            //     }
            // });
        }

        $scope.init = init();
    }
})();
