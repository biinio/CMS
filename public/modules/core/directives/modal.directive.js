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
                    $('#' + attributes.target).insertBefore($('.nps'));
                    $('#' + attributes.target).modal({backdrop:'static',keyboard:false});
                    $('#' + attributes.target).modal('show');
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
