'use strict';

angular.module('app.core').service('Permission', ['$http', '$q', 'Authentication',


    function ($http, $q, Authentication) {

        var deferObject;

        var service = {
            //permissions: {},

            getPermissions: function () {
                if (Authentication.user) {
                    var promise = $http.get(ApplicationConfiguration.applicationBackendURL + 'roles/' + Authentication.user.role + '/getpermission');
                    deferObject = deferObject || $q.defer();

                    promise.then(function (result) {

                            Authentication.user.permissions = result.data.data;

                            /*var list = result.data.data;

                            if (list.length > 0) {
                                var index;
                                for (index = 0; index < list.length; index++) {
                                    service.permissions[list[index]] = true;
                                }
                            }*/
                            deferObject.resolve(result);
                        },
                        function (reason) {
                            deferObject.reject(reason);
                        });
                    return deferObject.promise;
                }
            }
        };

        return service;

    }]);
