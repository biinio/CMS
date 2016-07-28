(function () {
    'use strict';

    angular
        .module('app.core')
        .run(coreMenu);

    coreMenu.$inject = ['Menus'];
    function coreMenu(Menus) {
        // Add default menu entry
        //Menus.addMenuItem('sidebar', 'Home', 'home', null, '/home', true, null, null, 'icon-home');

        Menus.addMenuItem('sidebar', 'Resumen'    , 'dashboard'       , null, 'app.dashboard'    , false, null, null, 'icon-speedometer', "SIDEBAR.MENU_DASHBOARD");
        Menus.addMenuItem('sidebar', 'Productos'     , 'elements'        , null, 'app.elements'     , false, null, null, 'icon-book-open', "SIDEBAR.MENU_ELEMENTS");
        Menus.addMenuItem('sidebar', 'Vitrinas'     , 'showcases'       , null, 'app.showcases'     , false, null, null, 'icon-docs', "SIDEBAR.MENU_SHOWCASES");
        Menus.addMenuItem('sidebar', 'Avisos'        , 'biins'           , null, 'app.biins'        , false, null, null, 'icon-feed', "SIDEBAR.MENU_BIINS");
        Menus.addMenuItem('sidebar', 'Locales'        , 'sites'           , null, 'app.sites'        , false, null, null, 'icon-pointer', "SIDEBAR.MENU_SITES");
        Menus.addMenuItem('sidebar', 'Regalos'        , 'gifts'           , null, 'app.gifts'        , false, null, null, 'icon-present', "SIDEBAR.MENU_GIFTS");
        Menus.addMenuItem('sidebar', 'Tarjetas'        , 'cards'           , null, 'app.cards'        , false, null, null, 'icon-note', "SIDEBAR.MENU_CARDS");
        Menus.addMenuItem('sidebar', 'Organizaciones', 'organization'   , null, 'app.organization'  , false, null, null, 'icon-globe', "SIDEBAR.MENU_ORGANIZATIONS");
        Menus.addMenuItem('sidebar', 'Perfil'      , 'profile'         , null, 'app.profile'      , false, null, null, 'icon-user', "SIDEBAR.MENU_PROFILE");
        //Maintenance has role field: maintenance
        Menus.addMenuItem('sidebar', 'Mantenimiento', 'maintenance', null, 'app.maintenance', false, 'maintenance', null, 'icon-settings', "SIDEBAR.MENU_MAINTENANCE");
    }

})();
