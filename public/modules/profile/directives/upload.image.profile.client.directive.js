(function() {
    'use strict';

    angular
        .module('profile')
        .directive('uploadProfileImage', uploadProfileImage);
    uploadProfileImage.$inject = ['$rootScope','Authentication','ObjectsSidebar'];
    function uploadProfileImage($rootScope,Authentication,ObjectsSidebar){
        return{
            restrict:'A',
            link:function(scope, element, attrs){
                var $inputFileElement=$(attrs['uploadProfileImage']);

                //Change event when an image is selected
                $inputFileElement.on('change',function(){
                    console.log("Change beginning the upload");

                    var files = $inputFileElement[0].files;
                    var formData = new FormData();
                    for (var i = 0; i < files.length; i++) {
                        var mediaFile = files[i];
                        mediaFile.originalFilename=files[i].name;
                        formData.append('file', mediaFile);
                    }

                    //Upload The media information

                    //scope.loadingImagesChange(true);
                    // now post a new XHR request
                    var xhr = new XMLHttpRequest();

                    xhr.open('POST', ApplicationConfiguration.applicationBackendURL + 'api/imageProfile');
                    xhr.setRequestHeader('accountidentifier', Authentication.user.accountIdentifier);
                    xhr.setRequestHeader('name', Authentication.user.name);
                    xhr.onload = function (data) {
                        if (xhr.status === 200) {
                            var obj= $.parseJSON(xhr.response);

                            $rootScope.$broadcast("changeProfileImage",obj.data);
                            //scope.changeProfileImage(obj.data);

                            console.log('all done: ' + xhr.status);
                            //scope.loadingImagesChange(false);
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

                });
                //Click event of the style button
                $(element[0]).on('click touch',function(e){
                    $inputFileElement.trigger('click');
                });
            }
        }
    }
})();
