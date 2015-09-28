/**
 * Created by Ivan on 8/27/15.
 */
/**=========================================================
 * Module: dashboard.js
 * Dashboard for biin
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('sites')
        .controller('SitesController', SitesController);

    SitesController.$inject = ['$http', '$state','$scope', 'Authentication', 'Organization','Categories', 'ObjectsSidebar','Gallery'];
    function SitesController($http, $state, $scope, Authentication, Organization,Categories, ObjectsSidebar,Gallery) {
        var vm = this;
        activate();
        $scope.objectsSidebarService = ObjectsSidebar;
        $scope.sidebarTemplate =
            "<div class='col-md-3 thumbListImage'>" +
            "<img ng-if='item.media.length == 0' src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDAiIGhlaWdodD0iMTQwIj48cmVjdCB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjcwIiB5PSI3MCIgc3R5bGU9ImZpbGw6I2FhYTtmb250LXdlaWdodDpib2xkO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtZmFtaWx5OkFyaWFsLEhlbHZldGljYSxzYW5zLXNlcmlmO2RvbWluYW50LWJhc2VsaW5lOmNlbnRyYWwiPjE0MHgxNDA8L3RleHQ+PC9zdmc+' alt=''/>" +
            "<img ng-if='item.media.length>0' ng-src='{{item.media[0].url}}' pending-indicator='pending-indicator'/>"+
            "</div>"+
            "<div class='col-md-9 leftInformationArea'>"+
            "<label class='moduleTitle'>{{item.title}}</label>"+
            "<div class='btnShowcasePreview icon-round-control btn-on-hover'>"+
            "<div class='icon icon-arrange-1'></div>"+
            "</div>"+
            "</div>"+
            "<div ng-click=\"deleteItem(objectsSidebarService.objects.indexOf(item),$event)\" class=\"icon-round-control btnDelete  btn-danger btn-on-hover\">"+
            "<i class=\"fa fa-close\"></i>"+
            "</div>";

        $scope.objectsSidebarService.template =$scope.sidebarTemplate;
        ////////////////

        function activate() {
            $scope.authentication = Authentication;
            $scope.organizationService = Organization;
        }

        $scope.$on('$stateChangeStart', function(){
            $scope.objectsSidebarService.reset();
        });

        $scope.$on('organizationChanged',function(){
            $scope.organizationId = $scope.organizationService.selectedOrganization.identifier;
            //Get the List of Objects
            $http.get('https://qa-biinapp.herokuapp.com/api/organizations/'+$scope.organizationService.selectedOrganization.identifier+'/elements').success(function(data){
                $scope.elements = data.data.elements;
                $scope.objectsSidebarService.setObjects($scope.elements);
            });

            Gallery.getList($scope.organizationId).then(function(promise){
                $scope.galleries = promise.data.data;
            });
        });

        $scope.$on("Biin: On Object Clicked", function(f,objectClicked){

        });

        $scope.$on("Biin: On Object Created", function(){
            //$scope.create();
        });

        $scope.$on("Biin: On Object Deleted", function(f,index){
            //$scope.removeElementAt(index);
        });
    }
})();
