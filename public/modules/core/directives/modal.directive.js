// **Created by Carlos on 15/07/2016
/*  Modal directive  */
(function() {
    'use strict';

    angular /*  Module getter */
        .module('app.core')
        .directive('modal', modal);

    function modal() {
        return {
            restrict: 'A',

            link:function($scope, element, attributes){

                $scope.open = function() {

                    // console.log($scope.npsTimeout.$$timeoutId);
                    $('#' + attributes.target).modal('show');
                    // clearTimeout($scope.npsTimeout.$$timeoutId);
                }
                $scope.close = function() {
                    $('#' + attributes.target).modal('hide');
                }

                var action = attributes['modal'];
                element.on('click', $scope[action]);
            }
        };
    }

})();
