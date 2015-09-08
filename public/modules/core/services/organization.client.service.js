'use strict';

angular.module('app.core').service('Organization', ['$http','$rootScope',

	function($http, $rootScope) {
        var selectedOrganization = {};
        var organizationsList = [];
        var promise = $http.get('/api/organization').then(function(result) {
                service.organizationsList = result.data.data;
                service.selectedOrganization = service.organizationsList[0];
            },
            function(){

            }
        );
        var service = {
            promise : promise,
            selectedOrganization : selectedOrganization,
            organizationsList : organizationsList,

            setSelectedOrganization :  function( index ){
                if(index >= 0 && index < this.organizationsList.length) {
                    this.selectedOrganization = this.organizationsList[index];
                    $rootScope.$broadcast('organizationChanged');
                }
            },

            removeOrganization:  function( id ){
                for(var i= 0; i< this.organizationsList.length; i++){
                    if(this.organizationsList[i].identifier == id){
                        this.organizationsList.slice(i,1);
                        break;
                    }
                }
            }
        };

        return service;
	}
]);
