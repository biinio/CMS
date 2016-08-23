// **Created by Carlos on 08/0/2016
/*  Print directive  */
(function() {
    'use strict';

    angular /*  Module getter */
        .module('app.core')
        .directive('ngPrint', ngPrint);

    function ngPrint() {
        var printSection = document.getElementById('printSection');

        // if there is no printing section, create one
        if (!printSection) {
            printSection = document.createElement('div');
            printSection.id = 'printSection';
            document.body.appendChild(printSection);
        }

        function link(scope, element, attrs) {
            element.on('click', function () {
                var elemToPrint = document.getElementById(attrs.printElementId);

                if (elemToPrint) {
                    printElement(elemToPrint);
                    window.print();
                }
            });

            window.onafterprint = function () {
                printSection.innerHTML = '';
            }
        }

        function printElement(elem) {
            var domClone = elem.cloneNode(true);

            if(elem.id=='qr-section'){
                printSection.innerHTML = '';
                var codeLink = document.getElementsByClassName('qrcode-link')[0].getAttribute('href');
                var codeImage = document.createElement('img');
                codeImage.setAttribute('src', codeLink);
                domClone.appendChild(codeImage);
            } else {
                printSection.innerHTML = '';
            }

            printSection.appendChild(domClone);
        }

        return {
            link: link,
            restrict: 'A'
        };
    }
}());
