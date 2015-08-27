'use strict';

//Menu service used for managing  menus
angular.module('app.core').service('Organization', ['$http','$window',

	function($http,$window) {
        this.selectedOrganization = {};
        this.organizationsList = [];

        this.getOrganizations = function() {
            var onSuccessCallback = function( data ){
                if(data) {
                    this.organizationsList = data.data;
                    this.selectedOrganization = this.organizationsList[0];
                }
            };
            $http.get('/api/organization').success(onSuccessCallback.bind(this)).error(function () {
                console.error("Error: unable to load organizations");
            });
        };

        this.setSelectedOrganization = function( index ){
            if(index >= 0 && index < this.organizationsList.length)
                this.selectedOrganization = this.organizationsList[index];
        };

        this.removeOrganization = function( id ){
            for(var i= 0; i< this.organizationsList.length; i++){
                if(this.organizationsList[i].identifier == id){
                    this.organizationsList.slice(i,1);
                    break;
                }
            }
        };

        this.getOrganizations();
	}
]);
