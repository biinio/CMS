(function () {
    'use strict';

    angular
        .module('app.core')
        .run(coreMenu);

    coreMenu.$inject = ['Menus'];
    function coreMenu(Menus) {
        // Add default menu entry
        //Menus.addMenuItem('sidebar', 'Home', 'home', null, '/home', true, null, null, 'icon-home');

        Menus.addMenuItem('sidebar', 'Resumen'      , 'dashboard'       , null, 'app.dashboard'     , false, 'access_dashboard'     , null, 'icon-speedometer'  , "SIDEBAR.MENU_DASHBOARD");
        Menus.addMenuItem('sidebar', 'Productos'    , 'products'        , null, 'app.products'      , false, 'access_products'      , null, 'icon-book-open'    , "SIDEBAR.MENU_PRODUCTS");
        Menus.addMenuItem('sidebar', 'Vitrinas'     , 'showcases'       , null, 'app.showcases'     , false, 'access_showcases'     , null, 'icon-docs'         , "SIDEBAR.MENU_SHOWCASES");
        Menus.addMenuItem('sidebar', 'Avisos'       , 'biins'           , null, 'app.biins'         , false, 'access_notices'       , null, 'icon-feed'         , "SIDEBAR.MENU_BIINS");
        Menus.addMenuItem('sidebar', 'Locales'      , 'sites'           , null, 'app.sites'         , false, 'access_locals'        , null, 'icon-pointer'      , "SIDEBAR.MENU_SITES");
        Menus.addMenuItem('sidebar', 'Regalos'      , 'gifts'           , null, 'app.gifts'         , false, 'access_gifts'         , null, 'icon-present'      , "SIDEBAR.MENU_GIFTS");
        Menus.addMenuItem('sidebar', 'Tarjetas'     , 'cards'           , null, 'app.cards'         , false, 'access_cards'         , null, 'icon-note'         , "SIDEBAR.MENU_CARDS");
        Menus.addMenuItem('sidebar', 'Usuarios'     , 'maintenance'     , null, 'app.users'         , false, 'access_maintenance'   , null, 'icon-user'         , "SIDEBAR.MENU_USERS");
        Menus.addMenuItem('sidebar', 'Mantenimiento', 'maintenance'     , null, 'app.maintenance'   , false, 'access_maintenance'   , null, 'icon-settings'     , "SIDEBAR.MENU_MAINTENANCE");
    }

})();
