/**
 * Created by Ivan on 9/22/15.
 */
/**=========================================================
 * Module: tags-input.js
 * Initializes the tag inputs plugin
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('gallery')
        .directive('gallery', Gallery);

    Gallery.$inject = ['$modal','ObjectsSidebar'];
    function Gallery ($modal,ObjectsSidebar) {
        var objectsSidebar  = ObjectsSidebar;
        var directive = {
            link: link,
            restrict: 'E',
            scope:{
                media : '=ngModel',
                gallery : '='
            },
            template:
            '<div class="row">'+
                '<div scrollbar="scrollbarOptionsStandard" class="ownedGalleryWrapper scrollbar-inner">'+
                    '<div ng-repeat="item in media" class="img-block" data-drop="true"  jqyoui-droppable="{index:{{$index}}}" data-drag="true" data-jqyoui-options="{revert: \'invalid\',zIndex: 100}" jqyoui-draggable="{insertInline:true, index:{{$index}}}" ng-model="media">'+
                        '<div class="moduleWrapper img-block-buttons">'+
                            '<img ng-src="{{item.url}}" pending-indicator="pending-indicator" class="imagegallery img-responsive"/>'+
                            '<div ng-click="removeMediaAt(media.indexOf(item))" class="btnShowcasePreview icon-round-control btnDelete btn-danger btn-on-hover">'+
                                '<i class="fa fa-close"></i>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="img-add-block">'+
                        '<div  ng-click="showImageModal()" class="btn-default img-add-block-wrapper dottedBorder">'+
                            '<span translate="GENERIC.ADD_IMAGE" class="btn-browse"></span>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'
        };

        return directive;

        function link(scope, element, attrs)
        {

            scope.$watch('gallery', function(value){
                if(value){
                    //console.log(value);
                    scope.galleries = value;
                }
            });

            scope.removeMediaAt = function(index){
                scope.$parent.removeMediaAt(index);
            };

            scope.showImageModal = function(){
                var mapInstance = $modal.open({
                    scope:scope,
                    templateUrl: '/modules/gallery/views/partials/gallery.modal.html',
                    controller: 'GalleryController',
                    size:'lg',
                    resolve:{
                        loadingImages : function(){ return scope.loadingImages;},
                        organizationId : function(){ return scope.organizationId;},
                        galleries : function(){ return scope.gallery;}

                    }
                });
                mapInstance.result.then(function ( modalInfo ) {

                    for (var i = 0; i < modalInfo.selectedImages.length; i++) {
                        var newObj = {};
                        newObj.identifier = modalInfo.selectedImages[i].identifier;
                        newObj.url = modalInfo.selectedImages[i].url;
                        newObj.mainColor = modalInfo.selectedImages[i].mainColor;
                        newObj.vibrantColor = modalInfo.selectedImages[i].vibrantColor;
                        newObj.vibrantDarkColor = modalInfo.selectedImages[i].vibrantDarkColor;
                        newObj.vibrantLightColor = modalInfo.selectedImages[i].vibrantLightColor;
                        objectsSidebar.selectedObject.media.push(newObj);
                    }
                    //scope.gallery=modalInfo.galleries;
                }, function (modalInfo) {
                    console.log("cancelado");
                });
            };

        }
    }

})();
