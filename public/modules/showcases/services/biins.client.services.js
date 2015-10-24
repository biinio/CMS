(function() {
    'use strict';

    angular
        .module('showcases')
        .service('BiinsService', BiinsService);

    BiinsService.$inject = ['$http'];
    function BiinsService($http) {
        return {
            getList: function(organizationId){
                var promise = $http({method:'GET',url:ApplicationConfiguration.applicationBackendURL +'api/organizations/'+organizationId+'/biins'})
                    .success(function (data,status,headers,config){
                        return data;
                    }).error(function(data,status,headers,config){
                        return {"status":false};
                    });

                return promise;
            },
            saveList:function(organizationId,biinSite){
                var promise= $http({method:'POST',url:ApplicationConfiguration.applicationBackendURL +'api/organizations/'+organizationId+'/sites/biins', data:biinSite}).success(function(data,status,headers,config){
                    return data;
                }).error(function(data,status,headers,config){
                    return {"status":false};
                });

                return promise;
            }
        };
    }
})();
