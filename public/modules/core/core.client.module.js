(function () {
    'use strict';

    // Use Applicaion configuration module to register a new module
    ApplicationConfiguration.registerModule('app.core', [
        'app.routes',
        'app.sidebar',
        'app.navsearch',
        'app.preloader',
        'app.loadingbar',
        'app.translate',
        'app.settings',
        'app.forms',
        //'app.pages',
        'app.utils',
        'app.panels'
    ]);

})();
