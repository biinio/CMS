(function() {
    'use strict';

    angular
        .module('biins')
        .directive('localization', organizationDropDown);

    organizationDropDown.$inject = [];
    function organizationDropDown () {
        var directive = {
            link: link,
            restrict: 'E',
            template: "<label>{{getSiteName(item.siteIdentifier)}}</label>",
            transclude: true
        };
        return directive;

        function link(scope, element, attrs) {
            scope.getSiteName = function ( hola){
                return "HOLA";
            }
        }

    }


})();

