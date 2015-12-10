'use strict';

angular
    .module('gallery')
    .controller('GalleryController', GalleryController);
GalleryController.$inject = ['$scope','$modalInstance','galleries','Organization'];
function GalleryController($scope, $modalInstance, galleries,Organization) {
    $scope.organizationService = Organization;
    $scope.render = true;
    $scope.loadingImages = false;
    $scope.galleries = galleries;

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
        $scope.$digest();
    });


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

    $scope.uploadImage = function(){

        var myImage = $scope.image.cropImage;
        //$http.post(ApplicationConfiguration.applicationBackendURL + 'api/organizations/'+$scope.organizationService.selectedOrganization.identifier+'/gallery',{}).success(function(){

        //}).error(function(){

        //})
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
