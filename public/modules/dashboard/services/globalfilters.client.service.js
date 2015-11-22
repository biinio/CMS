'use strict';

angular.module('dashboard').service('GlobalFilters', ['$http','$rootScope',

	function($http, $rootScope) {


        var service = {
            selectedSite : 'undefined',
            dateRange : 0,

            changeDateRange : function ( numberDays ){
                this.dateRange = numberDays;
                $rootScope.$broadcast('Biin: Days Range Changed', numberDays);
            },

            changeSelectedSite : function ( newSite ) {
                this.selectedSite = newSite;
                $rootScope.$broadcast('Biin: Site Changed', newSite);
            },
            setDefaultSite: function( site ) {
                this.selectedSite = site;
            }
        };

        return service;
	}
]);
