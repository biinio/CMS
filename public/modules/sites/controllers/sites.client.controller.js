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

    SitesController.$inject = ['$http', '$state','$scope', 'Authentication', 'Organization','Categories', 'ObjectsSidebar','Gallery','Gmaps'];
    function SitesController($http, $state, $scope, Authentication, Organization,Categories, ObjectsSidebar,Gallery,Gmaps) {
        var vm = this;
        activate();
        $scope.objectsSidebarService = ObjectsSidebar;
        $scope.sidebarTemplate =
            "<div class='col-md-3 thumbListImage'>" +
            "<img ng-if='item.media.length == 0' src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDAiIGhlaWdodD0iMTQwIj48cmVjdCB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjcwIiB5PSI3MCIgc3R5bGU9ImZpbGw6I2FhYTtmb250LXdlaWdodDpib2xkO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtZmFtaWx5OkFyaWFsLEhlbHZldGljYSxzYW5zLXNlcmlmO2RvbWluYW50LWJhc2VsaW5lOmNlbnRyYWwiPjE0MHgxNDA8L3RleHQ+PC9zdmc+' alt=''/>" +
            "<img ng-if='item.media.length>0' ng-src='{{item.media[0].imgUrl}}' pending-indicator='pending-indicator'/>"+
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
            $http.get('https://qa-biinapp.herokuapp.com/api/organizations/'+$scope.organizationService.selectedOrganization.identifier+'/sites').success(function(data){
                $scope.sites = data.data.sites;
                $scope.objectsSidebarService.setObjects($scope.sites);
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


        //Constants
        $scope.maxMedia=0;

        //Init the the sites
        $scope.selectedSite = null;
        $scope.selectedBiin = null;
        $scope.currentModelId = null;

        $scope.organizationId = $scope.organizationService.selectedOrganization.identifier;

        $scope.newTagField=[];

        $scope.isValid =false;

        //Loading images service propertie
        $scope.loadingImages =false;

        //Draggable Properties
        $scope.dragCategoryIndex =-1;
        $scope.dragGalleryIndex=-1;

        //Biins to Purchase Site
        $scope.biinsQty=0;

        //Get the List of Showcases
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
        }

        //Get the list of the gallery
        Gallery.getList($scope.organizationId).then(function(promise){
            $scope.galleries= promise.data.data;
        });

        //Create a new Site
        $scope.create = function(){
            //Get the Mayor from server
            $http.post('api/organizations/'+$scope.organizationId+"/sites").success(function(site,status){
                if(status==201){
                    $scope.sites.push(site);
                    $scope.biinsQty=0;
                    $scope.wizardPosition=1;
                    $scope.clearValidations();
                    $scope.edit($scope.sites.indexOf(site));
                }else
                {
                    displayErrorMessage(site,"Sites Creation",status)
                }
            });
        }

        //Edit an site
        $scope.edit = function(index){
            $scope.selectedSite = index;
            $scope.activeTab=tabDetails;
            $scope.currentModelId = $scope.sites[index].identifier;
            $scope.clearValidations();
            $scope.wizardPosition=1;
            $scope.validate(true);
        }

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
        }

        //Save detail model object
        $scope.save= function(){
            console.log("save");
            $http.put('api/organizations/'+$scope.organizationId+'/sites/'+$scope.currentModelId,{model:$scope.sites[$scope.selectedSite]}).success(function(data,status){
                if("replaceModel" in data){
                    $scope.sites[$scope.selectedSite] = data.replaceModel;
                }
                if(data.state=="success")
                    $scope.succesSaveShow=true;
            });

        }

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
        }

        //Details
        //Change Wizad tab manager
        $scope.changeWizardTab=function(option){
            switch(option){
                case 1:
                    $scope.wizardPosition =option;
                    break;
                case 2:
                    if($scope.wizard1IsValid)
                        $scope.wizardPosition =option;
                    break
                /*case 3:
                 if($scope.wizard1IsValid&& $scope.wizard2IsValid)
                 $scope.wizardPosition =option;
                 $scope.wizard3IsValid=true;
                 break  */
                case 3:
                    if($scope.wizard1IsValid&& $scope.wizard2IsValid)
                        $scope.wizardPosition =option;
                    break
                case 4:
                    if($scope.wizard1IsValid&& $scope.wizard2IsValid && $scope.wizard3IsValid)
                        $scope.wizardPosition =option;
                    break
                case 5:
                    if($scope.wizard1IsValid&& $scope.wizard2IsValid && $scope.wizard3IsValid)
                        $scope.wizardPosition =option;
                    break
                default:
                    $scope.wizardPosition =option;
                    break;
            }

            //Validate the current option
            $scope.validate();
        }

        //Add tag information
        $scope.addSiteTag=function(value){

            if(!$scope.sites[$scope.selectedSite].searchTags)
                $scope.sites[$scope.selectedSite].searchTags=[];


            if(value!=""){
                //If the values is not in the array
                if($.inArray(value, $scope.sites[$scope.selectedSite].searchTags)==-1)
                {
                    $scope.sites[$scope.selectedSite].searchTags.push(value);
                    $scope.newTagField={tag:""};
                }

            }
        }

        //Remove of Site Tag
        $scope.removeSiteTag=function(index){
            if($scope.sites[$scope.selectedSite].searchTags.length>index){
                $scope.sites[$scope.selectedSite].searchTags.splice(index,1);
            }
        }

        //Location Methods
        $scope.changeLocation=function(lat,lng){
            $scope.sites[$scope.selectedSite].lat=lat;
            $scope.sites[$scope.selectedSite].lng=lng;

            //Apply the changes
            $scope.$digest();
            $scope.$apply();
        }
        //Biins
        //Create a  new Biin

        //Purchase Biin Function
        $scope.purchaseBiin=function(qty, isBasicPackage){
            //Put the purchase order
            $http.post("api/organizations/"+$scope.organizationId+"/sites/"+$scope.sites[$scope.selectedSite].identifier+"/biins",{biinsQty:qty,isBasicPackage:isBasicPackage}).success(function(data,status){
                if(status==201){
                    //Push the
                    for(var i=0; i<data.length;i++)
                        $scope.sites[$scope.selectedSite].biins.push(data[i]);
                    $('#purchaseBeaconModal').modal('hide');
                    $scope.biinsQty=0;
                    $scope.validate();
                }else
                    displayErrorMessage(data,"Purchase Biin",status)

            });
        }

        //Select Biin Type function
        $scope.selectBiinType=function(type){
            if('isRequiredBiin' in $scope.sites[$scope.selectedSite].biins[$scope.selectedBiin]){
                if(!$scope.sites[$scope.selectedSite].biins[$scope.selectedBiin].isRequiredBiin){
                    if($scope.sites[$scope.selectedSite].biins[$scope.selectedBiin].biinType!==''+type)
                        $scope.sites[$scope.selectedSite].biins[$scope.selectedBiin].biinType=""+type;
                }

            }else{
                if($scope.sites[$scope.selectedSite].biins[$scope.selectedBiin].biinType!==''+type)
                    $scope.sites[$scope.selectedSite].biins[$scope.selectedBiin].biinType=""+type;
            }
            $scope.validate(true);

        }

        //Category return if contains a specific category
        $scope.containsCategory=function(category){
            if(typeof(_.findWhere($scope.sites[$scope.selectedSite].categories,{identifier:category.identifier}))!='undefined')
                return 'active'
            else
                return "";
        }
        //Change the state of the category relation with the Site
        $scope.switchCategoryState =function(category){
            var index =-1;
            var cat = _.findWhere($scope.sites[$scope.selectedSite].categories,{identifier:category.identifier});
            if(typeof(cat)!='undefined'){
                index=$scope.sites[$scope.selectedSite].categories.indexOf(cat);
            }

            if(index>=0)
                $scope.sites[$scope.selectedSite].categories.splice(index,1)
            else
                $scope.sites[$scope.selectedSite].categories.push(category);

            $scope.validate();
            if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                $scope.$apply();
                $scope.$digest();
            }
        }
        //Edit a Biin
        $scope.editBiin= function(index){
            $scope.selectedBiin = index;
            $scope.activeTab=tabBiin;
        }

        //Save the new Biin in the selected site
        $scope.saveNewBiin=function(){
            $scope.biinPrototype=$.extend(true, {}, $scope.biinPrototypeBkp);
            $scope.selectedBiin=null;
            $scope.activeTab = tabDetails;
        }

        //Categories

        //Insert a gallery item to site
        $scope.insertGalleryItem = function(index){
            if(($scope.sites[$scope.selectedSite].media.length < $scope.maxMedia &&  index < $scope.galleries.length && $scope.galleries[index])||$scope.maxMedia==0){
                var newObj = {};
                newObj.identifier = $scope.galleries[index].identifier;
                newObj.imgUrl = $scope.galleries[index].url;
                newObj.mainColor = $scope.galleries[index].mainColor;
                newObj.vibrantColor = $scope.galleries[index].vibrantColor;
                newObj.vibrantDarkColor = $scope.galleries[index].vibrantDarkColor;
                newObj.vibrantLightColor = $scope.galleries[index].vibrantLightColor;

                $scope.sites[$scope.selectedSite].media.push(newObj);

                $scope.wizard2IsValid= typeof($scope.sites[$scope.selectedSite].media)!='undefined'&& $scope.sites[$scope.selectedSite].media.length>0
                //Apply the changes
                $scope.$digest();
                $scope.$apply();
            }
        }

        //Remove the media object at specific index
        $scope.removeMediaAt=function(index){
            if($scope.sites[$scope.selectedSite].media.length>=index)
                $scope.sites[$scope.selectedSite].media.splice(index,1)

            $scope.wizard2IsValid= typeof($scope.sites[$scope.selectedSite].media)!='undefined'&& $scope.sites[$scope.selectedSite].media.length>0
        }

        //Validate the Form
        $scope.validate=function(validateAll){
            var validate=typeof(validateAll)!='undefined';
            //var validations =$scope.sitePrototype.validations();
            var currentValid=false;

            if(eval($scope.wizardPosition)==1 || validate){
                if($scope.sites[$scope.selectedSite])
                    $scope.wizard1IsValid= (typeof($scope.sites[$scope.selectedSite].title1)!='undefined' && $scope.sites[$scope.selectedSite].title1.length>0) && (typeof($scope.sites[$scope.selectedSite].title2)!='undefined' && $scope.sites[$scope.selectedSite].title2.length>0);
                else{
                    $scope.wizard1IsValid=false;
                }
                currentValid = $scope.wizard1IsValid;
            }
            if(eval($scope.wizardPosition)==2 || validate){
                $scope.wizard2IsValid= (typeof($scope.sites[$scope.selectedSite].media)!='undefined' && $scope.sites[$scope.selectedSite].media.length>0);
            }

            /*if( eval($scope.wizardPosition)==3 || validate){
             var coloursValidation=false;
             coloursValidation=typeof($scope.sites[$scope.selectedSite].mainColor)!='undefined' && $scope.sites[$scope.selectedSite].mainColor!="";
             coloursValidation=coloursValidation && typeof($scope.sites[$scope.selectedSite].textColor)!='undefined' && $scope.sites[$scope.selectedSite].textColor!="";
             $scope.wizard3IsValid=coloursValidation;
             }*/

            if( eval($scope.wizardPosition)==3 || validate){
                var locationValidate = false;
                if($scope.sites[$scope.selectedSite]){
                    locationValidate =typeof($scope.sites[$scope.selectedSite].country)!='undefined' && $scope.sites[$scope.selectedSite].country.length>0;
                    locationValidate =locationValidate && typeof($scope.sites[$scope.selectedSite].state)!='undefined' && $scope.sites[$scope.selectedSite].state.length>0;
                    locationValidate =locationValidate && typeof($scope.sites[$scope.selectedSite].city)!='undefined' && $scope.sites[$scope.selectedSite].city.length>0;
                    locationValidate =locationValidate && typeof($scope.sites[$scope.selectedSite].zipCode)!='undefined' && $scope.sites[$scope.selectedSite].zipCode.length>0;
                    locationValidate =locationValidate && typeof($scope.sites[$scope.selectedSite].streetAddres)!='undefined' && $scope.sites[$scope.selectedSite].streetAddres.length>0;
                    locationValidate =locationValidate && typeof($scope.sites[$scope.selectedSite].phoneNumber)!='undefined' && $scope.sites[$scope.selectedSite].phoneNumber.length>0;
                    $scope.wizard3IsValid=locationValidate;
                }
                else{
                    $scope.wizard3IsValid=false;
                }
                currentValid = $scope.wizard3IsValid;
            }
            /*if( eval($scope.wizardPosition)==4 || validate)
             {
             if($scope.sites[$scope.selectedSite]){
             $scope.wizard4IsValid=$scope.sites[$scope.selectedSite].biins.length>1;
             }else{
             $scope.wizard4IsValid=false;
             }
             }*/
            if(eval($scope.wizardPosition)== 5 || validate)
            {
                if($scope.sites[$scope.selectedSite]){
                    $scope.wizard5IsValid=$scope.sites[$scope.selectedSite].categories.length>0;
                }else{
                    $scope.wizard5IsValid=false;
                }
            }

            $scope.isValid = $scope.wizard1IsValid && $scope.wizard2IsValid&& $scope.wizard3IsValid&& $scope.wizard5IsValid;

            return currentValid;

        }

        $scope.clearValidations=function(){
            $scope.isValid = false;
            $scope.wizard1IsValid =false;
            $scope.wizard2IsValid=false;
            $scope.wizard3IsValid=false;
            $scope.wizard4IsValid=false;
            $scope.wizard5IsValid=false;
        }

        $scope.showMapModal = function ( )
        {
            var mapInstance = $modal.open({
                templateUrl: 'site/mapComponent',
                controller: 'mapCtrl',
                size:'lg'
            });
            mapInstance.result.then(function ( position ) {
                if(position){
                    $scope.sites[$scope.selectedSite].lng = position.lng;
                    $scope.sites[$scope.selectedSite].lat = position.lat;
                }
            }, function () {
            });
        }


        //Subscribe to a region
        $scope.subscribeToRegion=function(){

            //Post the a site in to a region
            $http.post("api/organizations/"+$scope.organizationId+"/sites/"+$scope.sites[$scope.selectedSite].identifier+"/region").success(function(data,status){
                if(status===200){
                    if(data.status===0){
                        $scope.sites[$scope.selectedSite].region=data.data;

                        //Apply the changes
                        if(!$scope.$$phase) {
                            //$digest or $apply
                            $scope.$digest();
                            $scope.$apply();
                        }

                    }
                    console.log(data);

                }else
                    displayErrorMessage(data,"Site Region",status)

            });
        }
        /****
         Methods
         ****/

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
        }
        //Set the gallery index when start draggin
        $scope.setDragGallery=function(scopeIndex){
            $scope.dragGalleryIndex= scopeIndex;
        }


        $scope.loadingImagesChange=function(state){
            $scope.loadingImages = state;
            $scope.$digest();
        }

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
