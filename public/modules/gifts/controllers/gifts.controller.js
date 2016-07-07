/**=========================================================
 * Module: gifts.controller.js
 * Controller of gifts
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('gifts')
        .controller('GiftsController', GiftsController);

    GiftsController.$inject = ['$http', '$scope', 'Loading', 'Organization', 'ObjectsSidebar', 'Authentication', '$translate'];

    function GiftsController($http, $scope, Loading, Organization, ObjectsSidebar, Authentication, $translate) {
        init();
        /**=============================================================================================================
         * Init Function
         =============================================================================================================*/

        function init() {
            //----Services needed----//
            //Loading Service
            $scope.loadingService = Loading;
            //Organization Service
            $scope.organizationService = Organization;
            //Objects Sidebar Service
            $scope.objectsSidebarService = ObjectsSidebar;
            //Authentication Service
            $scope.authentication = Authentication;

            //----Variables----//
            //Ready to fill
            $scope.ready = false;
            //State of loading screen
            $scope.products = [];
            $scope.gifts = [];
            $scope.loadingService.isLoading = true;
            //Gift Object
            $scope.objectsSidebarService.selectedObject = {};
            //Default bonus period state
            $scope.objectsSidebarService.selectedObject.bonusPeriodState = '0';
            //Current Date
            $scope.currentDate = new Date();
            //Draggable Properties
            $scope.organizationId = $scope.organizationService.selectedOrganization.identifier;
            $scope.sidebarTemplate =
                "<div class='col-md-3 thumbListImage'>" +
                    "<img src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDAiIGhlaWdodD0iMTQwIj48cmVjdCB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjcwIiB5PSI3MCIgc3R5bGU9ImZpbGw6I2FhYTtmb250LXdlaWdodDpib2xkO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtZmFtaWx5OkFyaWFsLEhlbHZldGljYSxzYW5zLXNlcmlmO2RvbWluYW50LWJhc2VsaW5lOmNlbnRyYWwiPjE0MHgxNDA8L3RleHQ+PC9zdmc+' alt=''/>" +
                    "<img ng-if='item.media.length>0' ng-src='{{item.media[0].url}}' pending-indicator='pending-indicator'/>"+
                "</div>"+
                "<div class='col-md-9 leftInformationArea'>"+
                    "<label class='twoRowTitle'>{{item.name}}</label>"+
                    "<label class='twoRowSubtitle'>{{item.title2}}</label>"+
                "</div>";
            $scope.objectsSidebarService.template =$scope.sidebarTemplate;

            //----Functions----//
            //Get the List of Elements
            $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/readyElements/').success(function(data) {
                $scope.products = data.data.elements;
            });
        }

        /**=============================================================================================================
         * Event Listeners
         =============================================================================================================*/

        $scope.$on('$stateChangeStart', function(){
            $scope.loadingService.isLoading = true;
            $scope.objectsSidebarService.reset();
        });

        $scope.$on("Biin: On Object Created", function(){
            $scope.create();
        });

        $scope.$on("Biin: On Object Clicked", function (event, objectClicked) {
            $scope.ready = true;
            console.log(objectClicked);
            console.log(event);
        });

        /**=============================================================================================================
         * Functions
         =============================================================================================================*/

        //Get the List of Gifts
        $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/gifts').success(function(gifts) {
            $scope.gifts = gifts;
            $scope.objectsSidebarService.setObjects($scope.gifts);
            $scope.loadingService.isLoading = false;
        });

        //Create a gift
        $scope.create = function(){
            var titleText = $translate.instant("GIFT.CREATING");
            swal({   title: titleText,  type: "info",   showConfirmButton: false });
            $http.post(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + "/gifts").success(function(gift,status){
                console.log(gift);
                console.log(status);
                if(status == 201){
                    var gifts = $scope.objectsSidebarService.getObjects();

                    gifts.push(gift);
                    $scope.objectsSidebarService.setObjects(gifts);
                    $scope.objectsSidebarService.setSelectedObject(gift);

                    setTimeout(function(){
                        swal.close();
                    },2000);
                }
            });
        }
    }
})();
