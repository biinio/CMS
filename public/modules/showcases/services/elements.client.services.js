(function() {
    'use strict';

    angular
        .module('showcases')
        .service('ElementsService', ElementsService);

    ElementsService.$inject = ['$http'];
    function ElementsService($http) {
        return {
            getList: function (organizationId) {
                var promise = $http({method:'GET', url:ApplicationConfiguration.applicationBackendURL +'api/organizations/'+organizationId+'/elements'})
                    .success(function (data, status, headers, config) {
                        return data;
                    })
                    .error(function (data, status, headers, config) {
                        return {"status": false};
                    });

                return promise;
            }
        };
    }
})();
