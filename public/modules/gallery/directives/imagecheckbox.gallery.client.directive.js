(function () {
    'use strict';

    angular
        .module('gallery')
        .directive('imageCheckbox', ImageCheckbox);

    ImageCheckbox.$inject = [];
    function ImageCheckbox() {
        return {
            restrict: 'A',
            link: function (scope, el, attr) {
                scope.isSelected = el.find('input').val() == 'false';
                el.on('click', function () {
                    scope.isSelected = !scope.isSelected;
                    scope.$apply();
                });
            }
        }

    }
})();
