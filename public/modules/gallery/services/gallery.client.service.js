/**
 * Created by Ivan on 9/23/15.
 */
(function() {
    'use strict';

    angular
        .module('gallery')
        .service('Gallery', Gallery);

    Gallery.$inject = ['$http'];
    function Gallery($http) {
        var service = {
            getList: function (organization) {
                var promise = $http.get('https://qa-biinapp.herokuapp.com/api/organizations/'+organization+'/gallery')
                    .success(function (data) {
                        return data.data;
                    })
                    .error(function (data) {
                        return {"status": false};
                    });

                return promise;
            }
        };
        return service;
    }
})();
