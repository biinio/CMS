'use strict';

angular.module('app.core').service('Categories', ['$http', function (async) {
    return {
        getList: function () {
            var promise = async({method:'GET', url:'https://qa-biinapp.herokuapp.com/api/categories'})
                .success(function (data, status, headers, config) {
                    return data;
                })
                .error(function (data, status, headers, config) {
                    return {"status": false};
                });
            return promise;
        }

    };
}]);