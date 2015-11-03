'use strict';

angular.module('dashboard').service('GlobalFilters', ['$http','$rootScope',

	function($http, $rootScope) {

        var service = {
            selectedSite : "",
            dateRange : 0,

            changeDateRange : function ( numberDays ){
                this.dateRange = numberDays;
                $rootScope.$broadcast('Biin: Days Range Changed', numberDays);
            }
        };

        return service;
	}
]);
