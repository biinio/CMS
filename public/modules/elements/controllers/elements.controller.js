/**=========================================================
 * Module: elements.controller.js
 * Controller of elements
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('elements')
        .controller('ElementsController', ElementsController);

    ElementsController.$inject = ['$http', '$state','$scope', 'Authentication', 'Organization', 'Categories', 'ObjectsSidebar'];

    function ElementsController($http, $state, $scope, Authentication, Organization,Categories, ObjectsSidebar) {
        var vm = this;
        activate();

        $scope.objectsSidebarService = ObjectsSidebar;
        $scope.sidebarTemplate =
            "<div class='col-md-3 thumbListImage'>" +
                "<img ng-if='item.media.length == 0' src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDAiIGhlaWdodD0iMTQwIj48cmVjdCB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjcwIiB5PSI3MCIgc3R5bGU9ImZpbGw6I2FhYTtmb250LXdlaWdodDpib2xkO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtZmFtaWx5OkFyaWFsLEhlbHZldGljYSxzYW5zLXNlcmlmO2RvbWluYW50LWJhc2VsaW5lOmNlbnRyYWwiPjE0MHgxNDA8L3RleHQ+PC9zdmc+' alt=''/>" +
                "<img ng-if='item.media.length>0' ng-src='{{item.media[0].url}}' pending-indicator='pending-indicator'/></div>"+
            "<div class='col-md-9'>"+
                "<label class='moduleTitle'>{{item.title}}</label>"+
                "<div ng-click=\"openConfirmation('sm',elements.indexOf(item))\" class='btnDelete icon-round-control btn-on-hover'>"+
                    "<div class='icon icon-bin-2'></div>"+
                "</div>"+
                "<div class='btnShowcasePreview icon-round-control btn-on-hover'>"+
                    "<div class='icon icon-arrange-1'></div>"+
                "</div>"+
            "</div>";

        $scope.objectsSidebarService.template =$scope.sidebarTemplate;
        ////////////////

        function activate() {
            $scope.authentication = Authentication;
            $scope.organizationService = Organization;
        }
        //Constants
        $scope.maxMedia=0;

        //Draggable Properties

        $scope.dragGalleryIndex=-1;
        $scope.organizationId = $scope.organizationService.selectedOrganization.identifier;
        $scope.newTagField=[];

        //Loading images service properties
        $scope.loadingImages =false;

        //Boolean values
        $scope.hasListPriceBool=false;
        $scope.hasDiscountBool=false;
        $scope.hasTimmingBool =false;
        $scope.hasQuantityBool=false;
        $scope.hasSavingBool=false;
        $scope.hasPriceBool=false;
        $scope.hasFromPriceBool=false;
        $scope.isHighlightBool=false;

        $scope.$on('organizationChanged',function(){
           console.warn("organization changed");
            $scope.organizationId = $scope.organizationService.selectedOrganization.identifier;
            //Get the List of Objects
            $http.get('https://qa-biinapp.herokuapp.com/api/organizations/'+$scope.organizationService.selectedOrganization.identifier+'/elements').success(function(data){
                $scope.elements = data.data.elements;
                $scope.objectsSidebarService.setObjects($scope.elements);
            });
        });

        $scope.$on("Biin: On Object Clicked", function(f,objectClicked){
            var elemSearchTag =$('#elemSearchTag');
            elemSearchTag.tagsinput("removeAll");
            for(var i=0;i< $scope.objectsSidebarService.selectedObject.searchTags.length;i++){
                elemSearchTag.tagsinput("add",$scope.objectsSidebarService.selectedObject.searchTags[i]);
            }

            console.log("Biin: On Object Clicked" + objectClicked);
        });

        $scope.$on("Biin: On Object Created", function(){
            console.log("Biin: On Object Created");
            $scope.create();
        });
        //Get the List of Objects
        $http.get('https://qa-biinapp.herokuapp.com/api/organizations/'+$scope.organizationService.selectedOrganization.identifier+'/elements').success(function(data){
            $scope.elements = data.data.elements;
            $scope.objectsSidebarService.setObjects($scope.elements);
        });



        //Push a new showcase in the list
        $scope.create = function(){
            $http.post('https://qa-biinapp.herokuapp.com/api/organizations/'+$scope.organizationService.selectedOrganization.identifier+"/elements").success(function(element,status){
                if(status==201){
                    var elemSearchTag =$('#elemSearchTag');
                    elemSearchTag.tagsinput("removeAll");
                    $scope.elements.push(element);
                    $scope.objectsSidebarService.setObjects($scope.elements);
                    $scope.objectsSidebarService.setSelectedObject(element);
                }else{
                    displayErrorMessage(element,"Element Creation",status);
                }
            });
        };

        //Select Element Type function
        $scope.selectType=function(index){
            if($scope.objectsSidebarService.selectedObject.elementType!==''+index)
                $scope.objectsSidebarService.selectedObject.elementType=""+index;
            else
                $scope.objectsSidebarService.selectedObject.elementType="";

            $scope.validate(true);
        };

        //Remove element at specific position
        $scope.removeElementAt = function(index){
            if($scope.objectsSidebarService.selectedObject==index){
                $scope.objectsSidebarService.selectedObject =null;
            }

            var elementId = $scope.objectsSidebarService.selectedObject.elementIdentifier;
            $scope.objectsSidebarService.selectedObject.splice(index,1);
            $http.delete('https://qa-biinapp.herokuapp.com/api/organizations/'+$scope.organizationId+'/elements/'+elementId).success(function(data){
                }
            );
        };

        //Save detail model object
        $scope.save= function(){
            $scope.objectsSidebarService.selectedObject.hasPrice=$scope.objectsSidebarService.selectedObject.price > 0?'1':'0';
            var tags = $("#elemSearchTag").tagsinput('items');
            $scope.objectsSidebarService.selectedObject.searchTags = [];
            for(var i = 0; i < tags.length; i++){
                $scope.objectsSidebarService.selectedObject.searchTags.push(tags[i]);
            }

            $http.put('https://qa-biinapp.herokuapp.com/api/organizations/'+$scope.organizationId+'/elements/'+$scope.objectsSidebarService.selectedObject.elementIdentifier,{model:$scope.objectsSidebarService.selectedObject}).success(function(data,status){
                if("replaceModel" in data){
                    $scope.objectsSidebarService.selectedObject = data.replaceModel;
                    $scope.elementPrototype =  $.extend(true, {}, $scope.elementPrototypeBkp);
                }
                if(data.state=="success")
                    $scope.succesSaveShow=true;
            });
        };

        //Get the List of Categories
        Categories.getList().then(function(promise){
            $scope.categories = promise.data.data;
        });

        //Return the categories of the selected element
        $scope.ownCategories=function(){
            var categories=[];
            //if($scope.objectsSidebarService.selectedObject && $scope.objectsSidebarService.selectedObject.categories)
              //  categories = $scope.objectsSidebarService.selectedObject.categories;
            return categories;
        };


        //Set the gallery index when start draggin
        $scope.setDragGallery=function(scopeIndex){
            $scope.dragGalleryIndex= scopeIndex;
        };



        //Select an sticker
        $scope.selectSticker=function(index){
            if($scope.objectsSidebarService.selectedObject.sticker.identifier !==$scope.stickers[index].identifier){
                $scope.objectsSidebarService.selectedObject.sticker.identifier= $scope.stickers[index].identifier;
                $scope.objectsSidebarService.selectedObject.sticker.color= $scope.stickers[index].color;
            }else{
                $scope.objectsSidebarService.selectedObject.sticker.identifier="";
                $scope.objectsSidebarService.selectedObject.sticker.color="";
            }
        };

        //Gallery Media Images

        //Insert a gallery item to site
        $scope.insertGalleryItem = function(index){
            if(($scope.objectsSidebarService.selectedObject.media.length < $scope.maxMedia &&  index < $scope.galleries.length && $scope.galleries[index])||$scope.maxMedia===0){
                var newObj = {};
                newObj.identifier = $scope.galleries[index].identifier;
                newObj.url = $scope.galleries[index].url;
                newObj.mainColor = $scope.galleries[index].mainColor;

                $scope.objectsSidebarService.selectedObject.media.push(newObj);

                $scope.wizard2IsValid= typeof($scope.objectsSidebarService.selectedObject.media)!='undefined'&& $scope.objectsSidebarService.selectedObject.media.length>0;
                //Apply the changes
                $scope.$digest();
                $scope.$apply();
            }
        };

        //Remove the media object at specific index
        $scope.removeMediaAt=function(index){
            if($scope.objectsSidebarService.selectedObject.media.length>=index)
                $scope.objectsSidebarService.selectedObject.media.splice(index,1);
        };

        //Get the list of the gallery
        /*gallerySrv.getList($scope.organizationId).then(function(promise){
            $scope.galleries = promise.data.data;
        });*/

        //On gallery change method
        $scope.onGalleryChange= function(obj,autoInsert){
            //Do a callback logic by caller
            $scope.galleries = $scope.galleries.concat(obj);
            $scope.$digest();

            if(autoInsert)
            {
                //Insert the images to the preview
                var cantToInsert=$scope.maxMedia- $scope.objectsSidebarService.selectedObject.media.length;
                for(var i=0; i< cantToInsert; i++){
                    $scope.insertGalleryItem($scope.galleries.indexOf(obj[i]));
                }
            }
        };

        $scope.loadingImagesChange=function(state){
            $scope.loadingImages = state;
            $scope.$digest();
        };

        //Element Details Methods
        $scope.insertDetail =function(elementType){
            if(typeof($scope.objectsSidebarService.selectedObject.details)==='undefined')
                $scope.objectsSidebarService.selectedObject.details=[];

            var newDetail ={elementDetailType:elementType, text:"", body:[]};
            $scope.objectsSidebarService.selectedObject.details.push(newDetail);


            //Detail Type List
            if(elementType=='4')
                $scope.addListItem($scope.objectsSidebarService.selectedObject.details.indexOf(newDetail));

            //Detail Type Price List
            if(elementType =='6')
                $scope.addListPriceItem($scope.objectsSidebarService.selectedObject.details.indexOf(newDetail));
        };

        //Category return if contains a specific categoru
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

            $scope.validate();
            if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                $scope.$apply();
                $scope.$digest();
            }
        };

        //Confirmation Modal of Remove
        /*$scope.openConfirmation = function (size, selectedIndex) {

            var modalInstance = $modal.open({
                templateUrl: 'partials/removeConfirmationModal',
                controller: 'responseInstanceCtrl',
                size: size,
                resolve: {
                    selectedElement: function () {
                        return {name:$scope.elements[selectedIndex].title,index:selectedIndex};
                    }
                }
            });

            modalInstance.result.then(function (itemIndex) {
                $scope.removeElementAt(itemIndex)
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        $scope.showImageModal = function ( )
        {
            var mapInstance = $modal.open({
                templateUrl: '/_partials/galleryWidget',
                controller: 'galleryCtrl',
                size:'lg',
                resolve:{
                    loadingImages : function(){ return $scope.loadingImages},
                    galleries : function(){ return $scope.galleries},
                    organizationId : function(){ return $scope.organizationId}
                }
            });
            mapInstance.result.then(function ( modalInfo ) {

                for (var i = 0; i < modalInfo.selectedImages.length; i++) {
                    var newObj = {};
                    newObj.identifier = modalInfo.selectedImages[i].identifier;
                    newObj.url = modalInfo.selectedImages[i].url;
                    newObj.mainColor = modalInfo.selectedImages[i].mainColor;
                    $scope.objectsSidebarService.selectedObject.media.push(newObj);
                }
                $scope.galleries=modalInfo.galleries;
            }, function (modalInfo) {
                $scope.galleries=modalInfo.galleries;
            });
        }*/

    }
})();
/*
//Change of image directive
    biinAppObjects.directive('inputChange',function(){
        return{
            restrict:'A',
            link:function(scope,element){
                $el = $(element);
                $el.on('change',function(e){
                    var index =scope.selectedElement;
                    scope.elements[index].imageUrl= $el.val();
                    scope.$digest();
                    scope.$apply();
                });
            }
        }
    });

    biinAppObjects.directive('selectPicker',function(){
        return{
            restrict:'A',
            link:function(scope,element){
                $el = $(element).selectpicker({width:'50px'});
            }
        }
    });

    biinAppObjects.controller('responseInstanceCtrl', function ($scope, $modalInstance, selectedElement) {

        $scope.objectName = selectedElement.name;
        $scope.objectIndex = selectedElement.index;


        $scope.ok = function () {
            $modalInstance.close($scope.objectIndex);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });

    biinAppObjects.controller('galleryCtrl', function ($scope, $modalInstance,loadingImages, galleries,organizationId) {
        $scope.render = true;
        $scope.loadingImages =loadingImages;
        $scope.galleries = galleries;
        $scope.organizationId = organizationId;


        $scope.loadingImagesChange=function(state){
            $scope.loadingImages = state;
            $scope.$digest();
        }

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

        $scope.apply = function(){
            var selectedImages = [];
            $(".galleryImageWrapper").each(function(index, element){
                if($(element).hasClass("selected"))
                {
                    selectedImages.push($scope.galleries[index]);
                }
            })
            var modalInfo = {};
            modalInfo.selectedImages = selectedImages;
            modalInfo.galleries = $scope.galleries;
            $modalInstance.close(modalInfo);
        }

        $scope.close = function () {
            var modalInfo = {};
            modalInfo.galleries = $scope.galleries;
            $modalInstance.dismiss(modalInfo);
        };
    }
*/
