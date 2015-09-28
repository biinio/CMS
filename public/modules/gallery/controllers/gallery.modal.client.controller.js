/**
 * Created by Ivan on 9/24/15.
 */
    'use strict';

    angular
        .module('gallery')
        .controller('GalleryController', GalleryController);
    GalleryController.$inject = ['$scope','$modalInstance','galleries'];
    function GalleryController($scope, $modalInstance, galleries) {
        $scope.render = true;
        $scope.loadingImages = false;
        $scope.galleries = galleries;


        $scope.loadingImagesChange = function (state) {
            $scope.loadingImages = state;
            $scope.$digest();
        };

        $scope.onGalleryChange = function (obj, autoInsert) {

            //Do a callback logic by caller
            $scope.galleries = $scope.galleries.concat(obj);
            $scope.$digest();

            //Insert the images to the preview
            if (autoInsert) {
                var cantToInsert = obj.length;
                if (maxMedia > 0)
                    cantToInsert = $scope.maxMedia - $scope.sites[$scope.selectedSite].media.length;

                for (var i = 0; i < cantToInsert; i++) {
                    $scope.insertGalleryItem($scope.galleries.indexOf(obj[i]));
                }
            }
        };

        $scope.apply = function () {
            var selectedImages = [];
            $(".galleryImageWrapper").each(function (index, element) {
                if ($(element).hasClass("selected")) {
                    selectedImages.push($scope.galleries[index]);
                }
            });
            var modalInfo = {};
            modalInfo.selectedImages = selectedImages;
            modalInfo.galleries = $scope.galleries;
            $modalInstance.close(modalInfo);
        };

        $scope.close = function () {
            var modalInfo = {};
            modalInfo.galleries = $scope.galleries;
            $modalInstance.dismiss(modalInfo);
        };
    }
