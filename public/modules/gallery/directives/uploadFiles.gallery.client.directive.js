(function () {
    'use strict';

    angular
        .module('gallery')
        .directive('uploadFiles', UploadFiles);

    UploadFiles.$inject = ['$modal','Organization'];

    function UploadFiles($modal,Organization) {
        var organizationService = Organization;
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.uploadMedia = function(scope,formData, autoInsert){
                    scope.loadingImagesChange(true);
                    // now post a new XHR request
                    var xhr = new XMLHttpRequest();

                    xhr.open('POST', 'https://qa-biinapp.herokuapp.com/api/organizations/'+organizationService.selectedOrganization.identifier+'/gallery');
                    xhr.onload = function (data) {
                        if (xhr.status === 200) {
                            var obj= $.parseJSON(xhr.response);

                            //Do a callback logic by caller
                            if(scope.onGalleryChange)
                                scope.onGalleryChange(obj,autoInsert);

                            console.log('all done: ' + xhr.status);
                            scope.loadingImagesChange(false);
                        } else {
                            console.log('Something went terribly wrong...');
                        }
                    };

                    xhr.upload.onprogress = function (event) {
                        if (event.lengthComputable) {
                            var complete = (event.loaded / event.total * 100 | 0);
                            //progress.value = progress.innerHTML = complete;
                        }
                    };

                    xhr.send(formData);
                };

                var $inputFileElement = $(attrs['uploadFiles']);
                var autoInsert = false;//Set to false default auto insert
                //Change event when an image is selected
                $inputFileElement.on('change', function () {
                    console.log("Change beginning the upload");

                    var files = $inputFileElement[0].files;
                    var formData = new FormData();
                    for (var i = 0; i < files.length; i++) {
                        var mediaFile = files[i];
                        mediaFile.originalFilename = files[i].name;
                        formData.append('file', mediaFile);
                    }
                    //Upload The media information
                    scope.uploadMedia(scope, formData);
                });
                //Click event of the style button
                $(element[0]).on('click touch', function (e) {
                    $inputFileElement.trigger('click');
                });
            }
        };
    }
})();
