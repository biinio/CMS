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
            $http.get('https://qa-biinapp.herokuapp.com/api/organizations/'+$scope.organizationService.selectedOrganization.identifier+'/sites').success(function(data){
                $scope.sites = data.data.sites;
                $scope.objectsSidebarService.setObjects($scope.sites);
            });

            Gallery.getList($scope.organizationId).then(function(promise){
                $scope.galleries = promise.data.data;
            });
        });

        $scope.$on("Biin: On Object Clicked", function(event,objectClicked){
            var siteSearchTag =$('#siteSearchTag');
            siteSearchTag.tagsinput("removeAll");
            for(var i=0;i< $scope.objectsSidebarService.selectedObject.searchTags.length;i++){
                siteSearchTag.tagsinput("add",$scope.objectsSidebarService.selectedObject.searchTags[i]);
            }
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
        $scope.selectedSite = null;
        $scope.selectedBiin = null;
        $scope.currentModelId = null;
        $scope.organizationId = $scope.organizationService.selectedOrganization.identifier;

        $scope.newTagField=[];

        //Loading images service property
        $scope.loadingImages =false;

        //Draggable Properties
        $scope.dragCategoryIndex =-1;
        $scope.dragGalleryIndex=-1;


        /**=============================================================================================================
         * Functions
         *
         =============================================================================================================*/

        //Get the List of Sites
        $http.get('https://qa-biinapp.herokuapp.com/api/organizations/'+ $scope.organizationService.selectedOrganization.identifier +'/sites').success(function(data){
            if(data.data)
                $scope.sites = data.data.sites;
            else
                $scope.sites=[];

            $scope.objectsSidebarService.setObjects($scope.sites);

            //$scope.sitePrototype = data.data.prototypeObj;
            /*if($scope.selectedSite == null && $scope.sites && $scope.sites.length>0){
                //Select the first element
                $scope.edit(0);
            }*/
        });

        //Get the List of Categories
        Categories.getList().then(function(promise){
            $scope.categories = promise.data.data;
        });

        //Return the categories of the sites
        $scope.ownCategories=function(){
            return $scope.sites[$scope.selectedSite].categories;
        };

        //Get the list of the gallery
        Gallery.getList($scope.organizationId).then(function(promise){
            $scope.galleries= promise.data.data;
        });

        //Create a new Site
        $scope.create = function(){
            //Get the Mayor from server
            $http.post('https://qa-biinapp.herokuapp.com/api/organizations/'+$scope.organizationId+"/sites").success(function(site,status){
                if(status==201){
                    var siteSearchTag =$('#siteSearchTag');
                    siteSearchTag.tagsinput("removeAll");
                    $scope.sites.push(site);
                    $scope.objectsSidebarService.setObjects($scope.elements);
                    $scope.objectsSidebarService.setSelectedObject(element);
                }
                else
                {
                    displayErrorMessage(site,"Sites Creation",status)
                }
            });
        };

        //Edit an site
        $scope.edit = function(index){
            $scope.selectedSite = index;
            $scope.activeTab=tabDetails;
            $scope.currentModelId = $scope.sites[index].identifier;
            $scope.clearValidations();
            $scope.wizardPosition=1;
            $scope.validate(true);
        };

        //Remove site at specific position
        $scope.removeSiteAt = function(index){
            if($scope.selectedSite==index){
                $scope.selectedSite =null;
                $scope.currentModelId =null;
            }
            if('isNew' in $scope.sites[index] ){
                $scope.sites.splice(index,1);
            }else//If the element is new is not in the data base
            {
                var siteId = $scope.sites[index].identifier;
                $scope.sites.splice(index,1);
                $http.delete('api/organizations/'+$scope.organizationId+'/sites/'+siteId).success(function(data){
                        if(data.state=="success"){
                            //Todo: implement a pull of messages
                        }
                    }
                );
            }
        };

        //Save detail model object
        $scope.save= function(){
            console.log("save");
            $http.put('https://qa-biinapp.herokuapp.com/api/organizations/'+$scope.organizationId+'/sites/'+$scope.currentModelId,{model:$scope.sites[$scope.selectedSite]}).success(function(data,status){
                if("replaceModel" in data){
                    $scope.sites[$scope.selectedSite] = data.replaceModel;
                }
                if(data.state=="success")
                    $scope.succesSaveShow=true;
            });

        };

        $scope.limitNutshell = function(){
            var value = $scope.sites[$scope.selectedSite].nutshell ;
            if(value == null)
                value = "";
            value = value.trim();
            var words = value.split(" ");
            if(words.length > 8)
                words.splice(8, words.length-8);
            var sentence = "";
            for (var i = 0; i < words.length; i++) {
                sentence += words[i] + " ";
            };
            sentence = sentence.trim();
            $scope.sites[$scope.selectedSite].nutshell = sentence;
        };

        //Location Methods
        $scope.changeLocation=function(lat,lng){
            $scope.sites[$scope.selectedSite].lat=lat;
            $scope.sites[$scope.selectedSite].lng=lng;

            //Apply the changes
            $scope.$digest();
            $scope.$apply();
        };

        //Category return if contains a specific category
        $scope.containsCategory=function(category){
            if(typeof(_.findWhere($scope.objectsSidebarService.selectedObject.categories,{identifier:category.identifier}))!='undefined')
                return 'active';
            else
                return "";
        };

        //Change the state of the category relation with the Site
        $scope.switchCategoryState =function(category){
            var index =-1;
            var cat = _.findWhere($scope.objectsSidebarService.selectedObject.categories,{identifier:category.identifier});
            if(typeof(cat)!='undefined'){
                index=$scope.objectsSidebarService.selectedObject.categories.indexOf(cat);
            }

            if(index>=0)
                $scope.objectsSidebarService.selectedObject.categories.splice(index,1);
            else
                $scope.objectsSidebarService.selectedObject.categories.push(category);

            if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                $scope.$apply();
                $scope.$digest();
            }
        };

        //Insert a gallery item to site
        $scope.insertGalleryItem = function(index){
            if(($scope.sites[$scope.selectedSite].media.length < $scope.maxMedia &&  index < $scope.galleries.length && $scope.galleries[index])||$scope.maxMedia==0){
                var newObj = {};
                newObj.identifier = $scope.galleries[index].identifier;
                newObj.url = $scope.galleries[index].url;
                newObj.mainColor = $scope.galleries[index].mainColor;
                newObj.vibrantColor = $scope.galleries[index].vibrantColor;
                newObj.vibrantDarkColor = $scope.galleries[index].vibrantDarkColor;
                newObj.vibrantLightColor = $scope.galleries[index].vibrantLightColor;

                $scope.sites[$scope.selectedSite].media.push(newObj);

                $scope.wizard2IsValid= typeof($scope.sites[$scope.selectedSite].media)!='undefined'&& $scope.sites[$scope.selectedSite].media.length>0;
                //Apply the changes
                $scope.$digest();
                $scope.$apply();
            }
        };

        //Remove the media object at specific index
        $scope.removeMediaAt=function(index){
            if($scope.sites[$scope.selectedSite].media.length>=index)
                $scope.sites[$scope.selectedSite].media.splice(index,1)
        };

        //On gallery change method
        $scope.onGalleryChange= function(obj,autoInsert){

            //Do a callback logic by caller
            $scope.galleries = $scope.galleries.concat(obj);
            $scope.$digest();

            //Insert the images to the preview
            if(autoInsert){
                var cantToInsert= obj.length;
                if(maxMedia>0)
                    cantToInsert=$scope.maxMedia- $scope.sites[$scope.selectedSite].media.length;

                for(var i=0; i< cantToInsert; i++){
                    $scope.insertGalleryItem($scope.galleries.indexOf(obj[i]));
                }
            }
        };

        //Set the gallery index when start draggin
        $scope.setDragGallery=function(scopeIndex){
            $scope.dragGalleryIndex= scopeIndex;
        };

        $scope.loadingImagesChange=function(state){
            $scope.loadingImages = state;
            $scope.$digest();
        };

        //Confirmation Modal of Remove
        $scope.openConfirmation = function (size, selectedIndex) {

            var modalInstance = $modal.open({
                templateUrl: 'partials/removeConfirmationModal',
                controller: 'responseInstanceCtrl',
                size: size,
                resolve: {
                    selectedElement: function () {
                        return {name:$scope.sites[selectedIndex].title1,index:selectedIndex};
                    }
                }
            });

            modalInstance.result.then(function (itemIndex) {
                $scope.removeSiteAt(itemIndex)
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

    }
})();
