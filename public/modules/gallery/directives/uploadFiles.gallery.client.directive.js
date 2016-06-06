(function () {
    'use strict';

    angular
        .module('gallery')
        .directive('uploadFiles', UploadFiles);

    UploadFiles.$inject = ['$uibModal','Organization','$rootScope'];

    function UploadFiles($modal,Organization,$rootScope) {
        var organizationService = Organization;
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.uploadMedia = function(scope,formData, autoInsert){
                    scope.loadingImagesChange(true);
                    // now post a new XHR request
                    var xhr = new XMLHttpRequest();

                    xhr.open('POST', ApplicationConfiguration.applicationBackendURL + 'api/organizations/'+organizationService.selectedOrganization.identifier+'/gallery');
                    xhr.onload = function (data) {
                        if (xhr.status === 200) {
                            var obj= $.parseJSON(xhr.response);

                            //Do a callback logic by caller
                            if(scope.onGalleryChange)
                                scope.onGalleryChange(obj,autoInsert);

                            //console.log('all done: ' + xhr.status);
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

                    var file=files[0];
                    var reader = new FileReader();
                    reader.onload = function (evt) {
                        var filename = "";
                        var filenameSplitted = file.name.split(".");
                        filenameSplitted.pop();
                        for(var i = 0; i < filenameSplitted.length; i++){
                            filename += filenameSplitted[i];
                            if(i < filenameSplitted.length -1){
                                filename += ".";
                            }
                        }


                        evt.target.filename = filename;
                        $rootScope.$broadcast("Biin: on fileUploaded", evt);
                    };
                    if(file)
                        reader.readAsDataURL(file);
                });
                //Click event of the style button
                $(element[0]).on('click touch', function (e) {
                    $inputFileElement.trigger('click');
                });
            }
        };
    }
})();
