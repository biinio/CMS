(function () {
    'use strict';

    angular
        .module('app.core')
        .run(coreMenu);

    coreMenu.$inject = ['Menus'];
    function coreMenu(Menus) {
        // Add default menu entry
        //Menus.addMenuItem('sidebar', 'Home', 'home', null, '/home', true, null, null, 'icon-home');

        Menus.addMenuItem('sidebar', 'Dashboard'    , 'dashboard'       , null, 'app.dashboard'    , false, null, null, 'icon-speedometer', "sidebar.MENU_DASHBOARD");
        Menus.addMenuItem('sidebar', 'Elements'     , 'elements'        , null, 'app.elements'     , false, null, null, 'icon-book-open', "sidebar.MENU_ELEMENTS");
        Menus.addMenuItem('sidebar', 'Showcase'     , 'showcases'       , null, 'app.showcases'     , false, null, null, 'icon-docs', "sidebar.MENU_SHOWCASES");
        Menus.addMenuItem('sidebar', 'Biins'        , 'biins'           , null, 'app.biins'        , false, null, null, 'icon-feed', "sidebar.MENU_BIINS");
        Menus.addMenuItem('sidebar', 'Sites'        , 'sites'           , null, 'app.sites'        , false, null, null, 'icon-pointer', "sidebar.MENU_SITES");
        Menus.addMenuItem('sidebar', 'Gifts'        , 'gifts'           , null, 'app.gifts'        , false, null, null, 'icon-present', "sidebar.MENU_GIFTS");
        Menus.addMenuItem('sidebar', 'Organizations', 'organization'   , null, 'app.organization'  , false, null, null, 'icon-globe', "sidebar.MENU_ORGANIZATIONS");
        Menus.addMenuItem('sidebar', 'Profile'      , 'profile'         , null, 'app.profile'      , false, null, null, 'icon-user', "sidebar.MENU_PROFILE");
        //Maintenance has role field: maintenance
        Menus.addMenuItem('sidebar', 'Maintenance', 'maintenance', null, 'app.maintenance', false, 'maintenance', null, 'icon-settings', "sidebar.MENU_MAINTENANCE");
    }

})();
