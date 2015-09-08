(function () {
    'use strict';

    angular
        .module('app.lazyload')
        .constant('APP_REQUIRES', {
            // jQuery based and standalone scripts
            scripts: {
                'modernizr': ['/lib/modernizr/modernizr.js'],
                'icons': ['/lib/fontawesome/css/font-awesome.min.css',
                    '/lib/simple-line-icons/css/simple-line-icons.css'],
                'filestyle': ['/lib/bootstrap-filestyle/src/bootstrap-filestyle.js']

            },
            // Angular based script (use the right module name)
            modules: [
                //{name: 'biinUsers', files: ['/modules/biinUsers/controllers/access-login.controller.js']},
                //{name: 'dashboard', files: ['/modules/dashboard/controllers/dashboard.controller.js']}

            ]
        })
    ;

})();
