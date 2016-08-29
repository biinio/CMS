'use strict';

angular.module('app.core').service('Organization', ['$http', '$q', '$rootScope', 'Authentication', 'GlobalFilters',


    function ($http, $q, $rootScope, Authentication, GlobalFilters) {

        var deferObject;

        var service = {

            selectedOrganization: 'undefined',
            selectedOrganizationId: 'undefined',
            organizationsList: [],

            getSelectedOrganization: function () {
                if (Authentication.user) {
                    var promise = $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + Authentication.user.accountIdentifier + '/selectedOrganization/');
                    deferObject = deferObject || $q.defer();

                    promise.then(function (result) {
                            service.selectedOrganizationId = result.data.data.selectedOrganization;
                            deferObject.resolve(result);
                        },
                        function (reason) {
                            deferObject.reject(reason);
                        });
                    return deferObject.promise;
                }
            },

            getOrganizations: function () {
                if (Authentication.user) {
                    var promise = $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations', {headers:{user: Authentication.user.accountIdentifier}});
                    deferObject = deferObject || $q.defer();

                    promise.then(function (result) {
                            service.organizationsList = result.data.data;

                            // Filter deleted sites
                            for (var orgIndex = 0; orgIndex < service.organizationsList.length; orgIndex++) {
                                var siteList = [];
                                for(var siteIndex = 0; siteIndex < service.organizationsList[orgIndex].sites.length; siteIndex++){
                                    if (service.organizationsList[orgIndex].sites[siteIndex].isDeleted == 0) {
                                        siteList.push(service.organizationsList[orgIndex].sites[siteIndex]);
                                    }
                                }
                                service.organizationsList[orgIndex].sites = siteList;
                            }

                            service.selectedOrganization = service.organizationsList[0];

                            // If last selected organization id has been retrieved
                            if (service.selectedOrganizationId != 'undefined') {

                                var orgFound = false;
                                var index = 0;
                                while (!orgFound && index < service.organizationsList.length) {
                                    if (service.organizationsList[index].identifier == service.selectedOrganizationId) {
                                        service.selectedOrganization = service.organizationsList[index];
                                        $rootScope.$broadcast('organizationReady');
                                        orgFound = true;
                                    }
                                    index++;
                                }

                            }
                            GlobalFilters.setDefaultSite(service.selectedOrganization.sites[0]);

                            deferObject.resolve(result);
                        },
                        function (reason) {
                            deferObject.reject(reason);
                        });
                    return deferObject.promise;
                }
            },

            setSelectedOrganization: function (index) {
                if (Authentication.user) {
                    if (!(index >= 0 && index < this.organizationsList.length)) {
                    } else {
                        this.selectedOrganization = this.organizationsList[index];
                        this.selectedOrganizationId = this.selectedOrganization.identifier;
                        GlobalFilters.setDefaultSite(service.selectedOrganization.sites[0]);

                        $http.put(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + Authentication.user.accountIdentifier + '/' + service.selectedOrganization.identifier, {});

                        $rootScope.$broadcast('organizationChanged');
                        //Update selected site when organization is changed
                        $rootScope.$broadcast('changeSelectedSite');
                    }
                }
            },

            removeOrganization: function (id) {
                for (var i = 0; i < this.organizationsList.length; i++) {
                    if (this.organizationsList[i].identifier == id) {
                        this.organizationsList.slice(i, 1);
                        break;
                    }
                }
                service.setSelectedOrganization(0);
            }
        };

        return service;

    }]);

