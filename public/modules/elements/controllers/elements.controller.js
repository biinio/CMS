/**=========================================================
 * Module: elements.controller.js
 * Controller of elements
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('elements')
        .controller('ElementsController', ElementsController);

    ElementsController.$inject = ['$http', '$state','$scope', 'Authentication', 'Organization', 'Categories'];

    function ElementsController($http, $state, $scope, Authentication, Organization,Categories) {
        var vm = this;
        activate();

        ////////////////

        function activate() {
            $scope.authentication = Authentication;
            $scope.organizationService = Organization;
        }
        //Constants
        $scope.maxMedia=0;

        //Draggable Properties
        $scope.dragCategoryIndex =-1;
        $scope.dragGalleryIndex=-1;
        $scope.selectedElement=null;
        $scope.currentModelId = null;
        $scope.organizationId = $scope.organizationService.selectedOrganization.identifier;
        $scope.activeTab ='details';
        $scope.newTagField="";
        $scope.activeValue='1';

        //Loading images service properties
        $scope.loadingImages =false;

        //Wizard validations indicators
        $scope.wizard1IsValid = false;
        $scope.wizard2IsValid =false;
        $scope.wizard3IsValid =false;
        $scope.wizard4IsValid =false;


        //Boolean values
        $scope.hasListPriceBool=false;
        $scope.hasDiscountBool=false;
        $scope.hasTimmingBool =false;
        $scope.hasQuantityBool=false;
        $scope.hasSavingBool=false;
        $scope.hasPriceBool=false;
        $scope.hasFromPriceBool=false;
        $scope.isHighlightBool=false;

        $scope.test = ["asd ", "djfkejhr", "kjdasdjk"];

        $scope.$on('organizationChanged',function(){
           console.warn("organization changed");
            $scope.organizationId = $scope.organizationService.selectedOrganization.identifier;
            //Get the List of Objects
            $http.get('https://qa-biinapp.herokuapp.com/api/organizations/'+$scope.organizationService.selectedOrganization.identifier+'/elements').success(function(data){
                $scope.elements = data.data.elements;
                if($scope.elements && $scope.elements !== null &&  $scope.elements.length>0){
                    //Select the first element
                    $scope.edit(0);
                }
            });
        });

        //Get the List of Objects
        $http.get('https://qa-biinapp.herokuapp.com/api/organizations/'+$scope.organizationService.selectedOrganization.identifier+'/elements').success(function(data){
            $scope.elements = data.data.elements;
            if($scope.elements && $scope.elements !== null &&  $scope.elements.length>0){
                //Select the first element
                $scope.edit(0);
            }
        });



        //Push a new showcase in the list
        /*$scope.create = function(){
            $http.post('https://qa-biinapp.herokuapp.com/api/organizations/'+$scope.organizationService.selectedOrganization.identifier+"/elements").success(function(element,status){
                if(status==201){
                    $scope.elements.push(element);
                    $scope.wizardPosition=1;
                    $scope.clearValidations();
                    $scope.edit($scope.elements.indexOf(element));
                }else{
                    displayErrorMessage(element,"Element Creation",status);
                }
            });
        };
        */
        //Edit an element
        $scope.edit = function(index){

            $scope.selectedElement = index;
            $scope.currentModelId = $scope.elements[index].elementIdentifier;

            //Set the Booleans Values
            $scope.hasListPriceBool= $scope.elements[index].hasListPrice==='1';
            $scope.hasDiscountBool= $scope.elements[index].hasDiscount==='1';
            $scope.hasTimmingBool= $scope.elements[index].hasTimming==='1';
            $scope.hasQuantityBool= $scope.elements[index].hasQuantity==='1';
            $scope.hasSavingBool= $scope.elements[index].hasSaving==='1';
            $scope.hasFromPriceBool= $scope.elements[index].hasFromPrice==='1';
            $scope.hasPriceBool= $scope.elements[index].hasPrice==='1';
            $scope.isHighlightBool= $scope.elements[index].isHighlight==="1";
            //$scope.clearValidations();
            //$scope.wizardPosition=1;
            //$scope.validate(true);

        };

        //Select Element Type function
        $scope.selectType=function(index){
            if($scope.elements[$scope.selectedElement].elementType!==''+index)
                $scope.elements[$scope.selectedElement].elementType=""+index;
            else
                $scope.elements[$scope.selectedElement].elementType="";

            $scope.validate(true);
        };

        //Remove element at specific position
        $scope.removeElementAt = function(index){
            if($scope.selectedElement==index){
                $scope.selectedElement =null;
                $scope.currentModelId =null;
            }

            var elementId = $scope.elements[index].elementIdentifier;
            $scope.elements.splice(index,1);
            $http.delete('https://qa-biinapp.herokuapp.com/api/organizations/'+$scope.organizationId+'/elements/'+elementId).success(function(data){
                }
            );
        };

        //Save detail model object
        $scope.save= function(){
            $scope.elements[$scope.selectedElement].hasPrice=$scope.elements[$scope.selectedElement].price > 0?'1':'0';
            $http.put('https://qa-biinapp.herokuapp.com/api/organizations/'+$scope.organizationId+'/elements/'+$scope.currentModelId,{model:$scope.elements[$scope.selectedElement]}).success(function(data,status){
                if("replaceModel" in data){
                    $scope.elements[$scope.selectedElement] = data.replaceModel;
                    $scope.elementPrototype =  $.extend(true, {}, $scope.elementPrototypeBkp);
                }
                if(data.state=="success")
                    $scope.succesSaveShow=true;
            });
        };

        //Add tag information
        $scope.addElementTag=function(value){

            if(!$scope.elements[$scope.selectedElement].searchTags)
                $scope.elements[$scope.selectedElement].searchTags=[];

            if(value!==""){
                //If the values is not in the array
                if($.inArray(value, $scope.elements[$scope.selectedElement].searchTags)==-1)
                {
                    $scope.elements[$scope.selectedElement].searchTags.push(value);
                    $scope.newTagField="";
                }

            }
        };

        //Remove of Site Tag
        $scope.removeElementTag=function(index){
            if($scope.elements[$scope.selectedElement].searchTags.length>index){
                $scope.elements[$scope.selectedElement].searchTags.splice(index,1);
            }
        };

        //Validations
        //Validate the steps
        $scope.validate=function(validateAll){
            var validate=typeof(validateAll)!='undefined';
            var currentValid=false;

            if($scope.wizardPosition==1 || validate){
                var wizard1IsValid = false;
                if($scope.elements[$scope.selectedElement]){
                    wizard1IsValid = (typeof($scope.elements[$scope.selectedElement].title)!='undefined' && $scope.elements[$scope.selectedElement].title.length>0);
                    if($scope.elements[$scope.selectedElement].details){
                        //Validate each element
                        for(var index=0;index <$scope.elements[$scope.selectedElement].details.length;index++){

                            if($scope.elements[$scope.selectedElement].details[index].elementDetailType=='4' || $scope.elements[$scope.selectedElement].details[index].elementDetailType=='6'){
                                if($scope.elements[$scope.selectedElement].details[index].body.length>0){
                                    //Foreach line in body validate the text
                                    for(var line=0; line<$scope.elements[$scope.selectedElement].details[index].body.length;line++){
                                        wizard1IsValid= wizard1IsValid & (typeof($scope.elements[$scope.selectedElement].details[index].body[line].line)!='undefined'&& $scope.elements[$scope.selectedElement].details[index].body[line].line.length>0);

                                        //Evaluate  other fielsd when is type 6
                                        if($scope.elements[$scope.selectedElement].details[index].elementDetailType=='6'){
                                            wizard1IsValid= wizard1IsValid & (typeof($scope.elements[$scope.selectedElement].details[index].body[line].description)!='undefined'&& $scope.elements[$scope.selectedElement].details[index].body[line].description.length>0);
                                        }
                                    }
                                }
                            }else{
                                wizard1IsValid= wizard1IsValid && (typeof($scope.elements[$scope.selectedElement].details[index].text)!='undefined' && $scope.elements[$scope.selectedElement].details[index].text.length>0);
                            }
                        }
                    }
                }
                else{
                    $scope.wizard1IsValid=false;
                }

                currentValid =wizard1IsValid;
                $scope.wizard1IsValid= wizard1IsValid;
            }
            if($scope.wizardPosition==2 || validate){
                $scope.wizard2IsValid= (typeof($scope.elements[$scope.selectedElement].media)!='undefined' && $scope.elements[$scope.selectedElement].media.length>0);
            }

            /*if(eval($scope.wizardPosition)==3 || validate){
             var coloursValidation=false;
             coloursValidation= typeof($scope.elements[$scope.selectedElement].textColor)!='undefined' && $scope.elements[$scope.selectedElement].textColor!="";
             $scope.wizard3IsValid= coloursValidation;
             }*/

            if($scope.wizardPosition==3 || validate){
                //If the element type is Benefit
                var wizard3IsValid =true;
                if($scope.elements[$scope.selectedElement].hasListPrice)
                    wizard3IsValid=  wizard3IsValid && (typeof($scope.elements[$scope.selectedElement].price)!='undefined' && $scope.elements[$scope.selectedElement].price.length>0);

                if($scope.elements[$scope.selectedElement].hasDiscount)
                    wizard3IsValid=wizard3IsValid && (typeof($scope.elements[$scope.selectedElement].discount)!='undefined' && $scope.elements[$scope.selectedElement].discount.length>0);

                if($scope.elements[$scope.selectedElement].hasTimming)
                    wizard3IsValid=wizard3IsValid && (typeof($scope.elements[$scope.selectedElement].initialDate) !='undefined') && (typeof($scope.elements[$scope.selectedElement].expirationDate)!='undefined');

                if($scope.elements[$scope.selectedElement].hasQuantity)
                    wizard3IsValid=wizard3IsValid && (typeof($scope.elements[$scope.selectedElement].quantity)!='undefined' && $scope.elements[$scope.selectedElement].quantity>0);

                if($scope.elements[$scope.selectedElement].hasSavingBool)
                    wizard3IsValid=wizard3IsValid && (typeof($scope.elements[$scope.selectedElement].savings)!='undefined' && $scope.elements[$scope.selectedElement].savings>0);

                if($scope.elements[$scope.selectedElement].hasListPriceBool)
                    wizard3IsValid=wizard3IsValid && (typeof($scope.elements[$scope.selectedElement].listPrice)!='undefined' && $scope.elements[$scope.selectedElement].listPrice>0);

                if($scope.elements[$scope.selectedElement].hasFromPriceBool)
                    wizard3IsValid=wizard3IsValid && (typeof($scope.elements[$scope.selectedElement].fromPrice)!='undefined' && $scope.elements[$scope.selectedElement].fromPrice>0);
                $scope.wizard3IsValid=wizard3IsValid;

            }

            //Categories Validate
            if($scope.wizardPosition== 4 || validate){
                if($scope.elements[$scope.selectedElement]){
                    $scope.wizard4IsValid=$scope.elements[$scope.selectedElement].categories.length>0;
                }else{
                    $scope.wizard4IsValid=false;
                }
            }

            $scope.isValid = $scope.wizard1IsValid && $scope.wizard2IsValid &&  $scope.wizard3IsValid &&  $scope.wizard4IsValid;

            return currentValid;
        };

        //Clear the validations
        $scope.clearValidations=function(){
            $scope.isValid = false;
            $scope.wizard1IsValid =false;
        };

        //Change tab to a specific section
        $scope.changeTabTo= function(tabToChange){
            $scope.activeTab = tabToChange;
        };

        //Get the List of Categories
        Categories.getList().then(function(promise){
            $scope.categories = promise.data.data;
        });

        //Return the categories of the selected element
        $scope.ownCategories=function(){
            var categories=[];
            //if($scope.elements[$scope.selectedElement] && $scope.elements[$scope.selectedElement].categories)
              //  categories = $scope.elements[$scope.selectedElement].categories;
            return categories;
        };


        //Set the gallery index when start draggin
        $scope.setDragGallery=function(scopeIndex){
            $scope.dragGalleryIndex= scopeIndex;
        };



        //Select an sticker
        $scope.selectSticker=function(index){
            if($scope.elements[$scope.selectedElement].sticker.identifier !==$scope.stickers[index].identifier){
                $scope.elements[$scope.selectedElement].sticker.identifier= $scope.stickers[index].identifier;
                $scope.elements[$scope.selectedElement].sticker.color= $scope.stickers[index].color;
            }else{
                $scope.elements[$scope.selectedElement].sticker.identifier="";
                $scope.elements[$scope.selectedElement].sticker.color="";
            }
        };

        //Gallery Media Images

        //Insert a gallery item to site
        $scope.insertGalleryItem = function(index){
            if(($scope.elements[$scope.selectedElement].media.length < $scope.maxMedia &&  index < $scope.galleries.length && $scope.galleries[index])||$scope.maxMedia===0){
                var newObj = {};
                newObj.identifier = $scope.galleries[index].identifier;
                newObj.url = $scope.galleries[index].url;
                newObj.mainColor = $scope.galleries[index].mainColor;

                $scope.elements[$scope.selectedElement].media.push(newObj);

                $scope.wizard2IsValid= typeof($scope.elements[$scope.selectedElement].media)!='undefined'&& $scope.elements[$scope.selectedElement].media.length>0;
                //Apply the changes
                $scope.$digest();
                $scope.$apply();
            }
        };

        //Remove the media object at specific index
        $scope.removeMediaAt=function(index){
            if($scope.elements[$scope.selectedElement].media.length>=index)
                $scope.elements[$scope.selectedElement].media.splice(index,1);
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
                var cantToInsert=$scope.maxMedia- $scope.elements[$scope.selectedElement].media.length;
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
            if(typeof($scope.elements[$scope.selectedElement].details)==='undefined')
                $scope.elements[$scope.selectedElement].details=[];

            var newDetail ={elementDetailType:elementType, text:"", body:[]};
            $scope.elements[$scope.selectedElement].details.push(newDetail);


            //Detail Type List
            if(elementType=='4')
                $scope.addListItem($scope.elements[$scope.selectedElement].details.indexOf(newDetail));

            //Detail Type Price List
            if(elementType =='6')
                $scope.addListPriceItem($scope.elements[$scope.selectedElement].details.indexOf(newDetail));
        };

        //Category return if contains a specific categoru
        $scope.containsCategory=function(category){
            //if(typeof(_.findWhere($scope.elements[$scope.selectedElement].categories,{identifier:category.identifier}))!='undefined')
              //  return 'active';
           // else
             //   return "";
        };

        //Change the state of the category relation with the Site
        $scope.switchCategoryState =function(category){
            var index =-1;
            var cat = _.findWhere($scope.elements[$scope.selectedElement].categories,{identifier:category.identifier});
            if(typeof(cat)!='undefined'){
                index=$scope.elements[$scope.selectedElement].categories.indexOf(cat);
            }

            if(index>=0)
                $scope.elements[$scope.selectedElement].categories.splice(index,1);
            else
                $scope.elements[$scope.selectedElement].categories.push(category);

            $scope.validate();
            if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                $scope.$apply();
                $scope.$digest();
            }
        };

        //Move detail to one place down if it's able
        $scope.moveDetailDown = function(index){
            var details = $scope.elements[$scope.selectedElement].details;
            var detailToMove = details[index];
            if(index+1<details.length)
            {
                details.splice(index,1);
                details.splice(index+1,0,detailToMove);
            }
        };

        //Move detail to one place up if it's able
        $scope.moveDetailUp = function(index){
            var details = $scope.elements[$scope.selectedElement].details;
            var detailToMove = details[index];
            if(index>0)
            {
                details.splice(index,1);
                details.splice(index-1,0,detailToMove);
            }
        };

        //Remove a element a specific index
        $scope.removeDetailAt=function(index){
            if($scope.elements[$scope.selectedElement].details.length>=index)
                $scope.elements[$scope.selectedElement].details.splice(index,1);
        };

        //Remove the list Item of an element
        $scope.removeListItemAt=function(detailIndex, listItemIndex){
            if($scope.elements[$scope.selectedElement].details.length>=detailIndex)
                $scope.elements[$scope.selectedElement].details[detailIndex].body.splice(listItemIndex,1);
        };

        //Remove the list price Item of an element
        $scope.removeListPriceItemAt=function(detailIndex, listItemIndex){
            if($scope.elements[$scope.selectedElement].details.length>=detailIndex)
                $scope.elements[$scope.selectedElement].details[detailIndex].body.splice(listItemIndex,1);
        };

        //Add a list item of an element
        $scope.addListItem =function(detailIndex){
            $scope.elements[$scope.selectedElement].details[detailIndex].body.push({line:""});
            $scope.validate();
        };

        //Add a Price List Item of an element
        $scope.addListPriceItem =function(detailIndex){
            $scope.elements[$scope.selectedElement].details[detailIndex].body.push({line:"",description:"",currencyType:"1"});
            $scope.validate();
        };

        //Toggle the changes
        $scope.changeBoolStateHighlights=function(model,value){
            switch(model){
                case 'hasListPrice':
                    if(value)
                        $scope.elements[$scope.selectedElement].hasListPrice='1';
                    else
                        $scope.elements[$scope.selectedElement].hasListPrice='0';
                    break;
                case 'hasDiscount':
                    if(value)
                        $scope.elements[$scope.selectedElement].hasDiscount='1';
                    else
                        $scope.elements[$scope.selectedElement].hasDiscount='0';
                    break;
                case 'hasTimming':
                    if(value)
                        $scope.elements[$scope.selectedElement].hasTimming='1';
                    else
                        $scope.elements[$scope.selectedElement].hasTimming='0';
                    break;
                case 'hasQuantity':
                    if(value)
                        $scope.elements[$scope.selectedElement].hasQuantity='1';
                    else
                        $scope.elements[$scope.selectedElement].hasQuantity='0';
                    break;
                case 'hasSaving':
                    if(value)
                        $scope.elements[$scope.selectedElement].hasSaving='1';
                    else
                        $scope.elements[$scope.selectedElement].hasSaving='0';
                    break;
                case 'hasPrice':
                    if(value)
                        $scope.elements[$scope.selectedElement].hasPrice='1';
                    else
                        $scope.elements[$scope.selectedElement].hasPrice='0';
                    break;
                case 'hasFromPrice':
                    if(value)
                        $scope.elements[$scope.selectedElement].hasFromPrice='1';
                    else
                        $scope.elements[$scope.selectedElement].hasFromPrice='0';
            }
            $scope.validate();
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
                    $scope.elements[$scope.selectedElement].media.push(newObj);
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