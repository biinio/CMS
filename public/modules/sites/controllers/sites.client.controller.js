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

    SitesController.$inject = ['$http', '$state','$timeout' ,'$scope', 'Authentication', 'Organization','Categories', 'ObjectsSidebar','Gallery'];
    function SitesController($http, $state, $timeout, $scope, Authentication, Organization,Categories, ObjectsSidebar,Gallery) {
        var vm = this;
        activate();

        function activate() {
            $scope.authentication = Authentication;
            $scope.organizationService = Organization;
        }

        /**=============================================================================================================
         * ObjectsSidebar Configuration
         *
         =============================================================================================================*/
        $scope.objectsSidebarService = ObjectsSidebar;
        $scope.sidebarTemplate =
            "<div class='col-md-3 thumbListImage'>" +
            "<img ng-if='item.media.length == 0' src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDAiIGhlaWdodD0iMTQwIj48cmVjdCB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjcwIiB5PSI3MCIgc3R5bGU9ImZpbGw6I2FhYTtmb250LXdlaWdodDpib2xkO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtZmFtaWx5OkFyaWFsLEhlbHZldGljYSxzYW5zLXNlcmlmO2RvbWluYW50LWJhc2VsaW5lOmNlbnRyYWwiPjE0MHgxNDA8L3RleHQ+PC9zdmc+' alt=''/>" +
            "<img ng-if='item.media.length>0' ng-src='{{item.media[0].url}}' pending-indicator='pending-indicator'/>"+
            "</div>"+
            "<div class='col-md-9 leftInformationArea'>"+
            "<label class='moduleTitle'>{{item.title1}}</label>"+
            "<br/>"+
            "<label class='moduleTitle'>{{item.title2}}</label>"+
            "<div class='btnShowcasePreview icon-round-control btn-on-hover'>"+
            "<div class='icon icon-arrange-1'></div>"+
            "</div>"+
            "</div>"+
            "<div ng-click=\"deleteItem(objectsSidebarService.objects.indexOf(item),$event)\" class=\"icon-round-control btnDelete  btn-danger btn-on-hover\">"+
            "<i class=\"fa fa-close\"></i>"+
            "</div>";

        $scope.objectsSidebarService.template =$scope.sidebarTemplate;

        /**=============================================================================================================
         * Events Listeners
         *
         =============================================================================================================*/

        $scope.$on('$stateChangeStart', function(){
            $scope.objectsSidebarService.reset();
        });

        $scope.$on('organizationChanged',function(){
            $scope.organizationId = $scope.organizationService.selectedOrganization.identifier;
            //Get the List of Objects
            $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/'+$scope.organizationService.selectedOrganization.identifier+'/sites').success(function(data){
                var sites = data.data.sites;
                $scope.objectsSidebarService.setObjects(sites);
                if(sites.length > 0)
                    selectFirstSite(sites);
            });

            Gallery.getList($scope.organizationId).then(function(promise){
                $scope.galleries = promise.data.data;
            });
        });

        $scope.$on("Biin: On Object Clicked", function(event,objectClicked){
            //I know it's ugly and I don't like this approach, it should be other way to  validate if the tag field is
            // rendered to call this code
            //TODO: Change this implementation for another safer way!!!
            $timeout(function(){
                var siteSearchTag = $('#siteSearchTag');
                siteSearchTag.tagsinput("removeAll");
                for(var i=0;i< $scope.objectsSidebarService.selectedObject.searchTags.length;i++){
                    siteSearchTag.tagsinput("add",$scope.objectsSidebarService.selectedObject.searchTags[i]);
                }
            },100);

        });

        $scope.$on("Biin: On Object Created", function(){
            $scope.create();
        });

        $scope.$on("Biin: On Object Deleted", function(event,index){
            $scope.removeSiteAt(index);
        });

        /**=============================================================================================================
         * Variables
         *
         =============================================================================================================*/

        //Init the the sites
        $scope.organizationId = $scope.organizationService.selectedOrganization.identifier;

        $scope.newTagField=[];

        //Loading images service property
        $scope.loadingImages =false;

        //Draggable Properties
        $scope.dragCategoryIndex =-1;
        $scope.dragGalleryIndex=-1;


        /**=============================================================================================================
         * Self called functions
         *
         =============================================================================================================*/

        //Get the List of Sites
        $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/'+ $scope.organizationService.selectedOrganization.identifier +'/sites').success(function(data){
            if(data.data) {
                $scope.objectsSidebarService.setObjects(data.data.sites);
                if(data.data.sites.length>0){
                    selectFirstSite(data.data.sites);
                }
            }
        });

        //Get the List of Categories
        Categories.getList().then(function(promise){
            $scope.categories = promise.data.data;
        });

        //Get the list of the gallery
        Gallery.getList($scope.organizationService.selectedOrganization.identifier).then(function(promise){
            $scope.galleries= promise.data.data;
        });

        /**=============================================================================================================
         *  Functions
         =============================================================================================================*/

        var selectFirstSite = function( sites ) {

            $scope.objectsSidebarService.selectedObject = sites[0];
            //I know it's ugly and I don't like this approach, it should be other way to  validate if the tag field is
            // rendered to call this code
            //TODO: Change this implementation for another safer way!!!
            $timeout(function(){
                var siteSearchTag = $('#siteSearchTag');
                for(var i=0;i< $scope.objectsSidebarService.selectedObject.searchTags.length;i++){
                    siteSearchTag.tagsinput("add",$scope.objectsSidebarService.selectedObject.searchTags[i]);
                }
            },100);

        };

        //Return the categories of the sites
        $scope.ownCategories=function(){
            return $scope.objectsSidebarService.selectedObject.categories;
        };

        //Create a new Site
        $scope.create = function(){
            //Get the Mayor from server
            $http.post(ApplicationConfiguration.applicationBackendURL + 'api/organizations/'+$scope.organizationService.selectedOrganization.identifier+"/sites").success(function(site,status){
                if(status==201){

                    var siteSearchTag =$('#siteSearchTag');
                    siteSearchTag.tagsinput("removeAll");

                    var sites = $scope.objectsSidebarService.getObjects();
                    sites.push(site);
                    $scope.objectsSidebarService.setObjects(sites);
                    $scope.objectsSidebarService.setSelectedObject(site);
                }
                else
                {
                    displayErrorMessage(site,"Sites Creation",status);
                }
            });
        };

        //Remove site at specific position
        $scope.removeSiteAt = function(index){

            var sites = $scope.objectsSidebarService.getObjects();
            var siteIdToDelete = sites[index].identifier;
            var deleteSelectedObject = siteIdToDelete == $scope.objectsSidebarService.selectedObject.identifier;

            $http.delete(ApplicationConfiguration.applicationBackendURL + 'api/organizations/'+$scope.organizationId+'/sites/'+siteIdToDelete).success(
                function(data){
                    if(data.state=="success"){
                        sites.splice(index,1);
                        if(deleteSelectedObject){
                            $scope.objectsSidebarService.selectedObject = null;
                        }
                        $scope.objectsSidebarService.setObjects(sites);

                    }else{
                        console.error("Couldn't delete site");
                    }
                }
            );

        };

        //Save detail model object
        $scope.save= function(){

            var tags = $("#siteSearchTag").tagsinput('items');

            $scope.objectsSidebarService.selectedObject.searchTags = [];

            for(var i = 0; i < tags.length; i++){
                $scope.objectsSidebarService.selectedObject.searchTags.push(tags[i]);
            }

            $http.put(ApplicationConfiguration.applicationBackendURL + 'api/organizations/'+$scope.organizationService.selectedOrganization.identifier+'/sites/'+$scope.objectsSidebarService.selectedObject.identifier,{model:$scope.objectsSidebarService.selectedObject}).success(function(data,status){
                if("replaceModel" in data){
                    $scope.objectsSidebarService.selectedObject = data.replaceModel;
                }
                if(data.state=="success")
                    $scope.succesSaveShow=true;
            });

        };

        // Function that limits in nutshell how many words can it be
        $scope.limitNutshell = function(){
            var value = $scope.objectsSidebarService.selectedObject.nutshell;

            if(value === null) {
                value = "";
            }

            value = value.trim();
            var words = value.split(" ");

            if(words.length > 8)
                words.splice(8, words.length-8);
            var sentence = "";

            for (var i = 0; i < words.length; i++) {
                sentence += words[i] + " ";
            }

            sentence = sentence.trim();
            $scope.objectsSidebarService.selectedObject.nutshell = sentence;
        };

        //Location Methods
        $scope.changeLocation=function(lat,lng){
            $scope.objectsSidebarService.selectedObject.lat=lat;
            $scope.objectsSidebarService.selectedObject.lng=lng;

            //Apply the changes
            $scope.$digest();
            $scope.$apply();
        };

        //Category return if contains a specific category
        $scope.containsCategory=function(category){
            if(typeof(_.findWhere($scope.objectsSidebarService.selectedObject.categories,{identifier:category.identifier}))!='undefined')
                return true;
            else
                return false;
        };


        //Change the state of the category relation with the Site
        $scope.updateSelectedCategories =function(category){
            var index =-1;
            var cat = _.findWhere($scope.objectsSidebarService.selectedObject.categories,{identifier:category.identifier});
            if(typeof(cat)!='undefined'){
                index=$scope.objectsSidebarService.selectedObject.categories.indexOf(cat);
            }

            if(index>=0)
                $scope.objectsSidebarService.selectedObject.categories.splice(index,1);
            else
                $scope.objectsSidebarService.selectedObject.categories.push(category);

        };

        //Remove the media object at specific index
        $scope.removeMediaAt=function(index){
            if($scope.objectsSidebarService.selectedObject.media.length>=index)
                $scope.objectsSidebarService.selectedObject.media.splice(index,1);
        };
    }
})();
