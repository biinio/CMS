'use strict';

angular
    .module('gallery')
    .controller('GalleryController', GalleryController);
GalleryController.$inject = ['$scope','$modalInstance','$http','galleries','Organization'];
function GalleryController($scope, $modalInstance,$http, galleries,Organization) {
    $scope.organizationService = Organization;
    $scope.render = true;
    $scope.loadingImages = false;
    $scope.croppingImages = false;
    $scope.galleries = galleries;
    console.log($scope.galleries);

    $scope.reset = function() {
        $scope.myImage        = '';
        $scope.myCroppedImage = '';
        $scope.imgcropType    = 'square';
    };
    $scope.image = {
        image: "",
        cropImage: ""
    };

    $scope.reset();

    $scope.$on("Biin: on fileUploaded",function(scope,event){
        $scope.image.image=event.target.result;
        $scope.filename = event.target.filename;
        $scope.croppingImages = true;
        $scope.loadingImages = false;
        $scope.$digest();
        //$scope.reset();
    });


    $scope.loadingImagesChange = function (state) {
        $scope.loadingImages = state;
        $scope.$digest();
    };

    $scope.onGalleryChange = function (obj, autoInsert) {

        //Do a callback logic by caller
        $scope.galleries = $scope.galleries.concat(obj);

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

    $scope.uploadImage = function(){

        var myImage = $scope.image.cropImage;

    };

    $scope.uploadImageToServer = function(){
        var myImage = $scope.image.cropImage;
        var filename = $scope.filename;
        $scope.croppingImages = false;
        $scope.loadingImages = true;
        $http.post(ApplicationConfiguration.applicationBackendURL + 'api/organizations/'+$scope.organizationService.selectedOrganization.identifier+'/gallery/upload',
            {
                images:[
                    {
                        image:myImage,
                        fileName:filename
                    }
                ]
            }).success(function(data){
                $scope.onGalleryChange(data);
                $scope.croppingImages = false;
                $scope.loadingImages = false;
            }).error(function(){
                $scope.croppingImages = false;
                $scope.loadingImages = false;
            });
    };


    $scope.confirmDeleteImage = function(message) {
        if (confirm(message)) {
            $scope.delete();
        }
    }

    $scope.delete = function() {
        var imagesToDelete = [];
        var imageIndex = [];
        $(".galleryImageWrapper").each(function (index, element) {
            if ($(element).hasClass("selected")) {
                imagesToDelete.push($scope.galleries[index]);
                imageIndex.push(index);
            }
        });

        //var imagesInUse = "";

        for (var index = 0; index < imagesToDelete.length; index++) {

            // Check if image is in use.
            $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationService.selectedOrganization.identifier + '/checkImage/' + imagesToDelete[index].identifier).success(function(data) {
                    if (data.deleted == true ) // image deleted, remove from gallery
                    {
                        $scope.galleries.splice(imageIndex[index], 1);
                        //$http.delete(ApplicationConfiguration.applicationBackendURL + 'api/organizations/'+$scope.organizationService.selectedOrganization.identifier+'/' + imageItem.identifier );
                    }

                }).error (function(msg) {
                console.log(msg)
            });

        }


        var modalInfo = {};
        //modalInfo.selectedImages = selectedImages;
        modalInfo.galleries = $scope.galleries;
        $modalInstance.dismiss(modalInfo);
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
