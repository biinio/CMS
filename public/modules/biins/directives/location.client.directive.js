(function() {
    'use strict';

    angular
        .module('biins')
        .directive('localization', organizationDropDown);

    organizationDropDown.$inject = ['$http','Organization'];
    function organizationDropDown ($http,Organization) {
        var directive = {
            link: link,
            restrict: 'E',
            template: "<text>{{getSiteName(item.siteIdentifier)}}</text>",
            transclude: false
        };
        return directive;

        function link(scope, element, attrs) {
            scope.organzationService = Organization;
            $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + scope.organzationService.selectedOrganization.identifier + '/sites/').success(function (data) {
                scope.sites = data.data.sites;
                scope.getSiteName = function (identifier) {
                    var site = _.findWhere(scope.sites, {identifier: identifier});
                    if (site) {
                        return site.title1 + " " + site.title2;
                    } else {
                        return "";
                    }
                };
                scope.$on('organizationChanged', function () {
                    $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + scope.organzationService.selectedOrganization.identifier + '/sites/').success(function (data) {
                        scope.sites = data.data.sites;
                    });
                });
            });

        }

    }


})();

