(function () {
    'use strict';

    angular
        .module('app.core')
        .run(coreMenu);

    coreMenu.$inject = ['Menus'];
    function coreMenu(Menus) {
        // Add default menu entry
        //Menus.addMenuItem('sidebar', 'Home', 'home', null, '/home', true, null, null, 'icon-home');

        Menus.addMenuItem('sidebar', 'Dashboard', 'dashboard', null, '/dashboard', false, null, null,'icon-speedometer', "sidebar.MENU_DASHBOARD");
        Menus.addMenuItem('sidebar', 'Sites', 'sites', null, '/sites', false, null, null,'icon-pointer', "sidebar.MENU_SITES");
        Menus.addMenuItem('sidebar', 'Elements', 'elements', null, '/elements', false, null, null,'icon-book-open', "sidebar.MENU_ELEMENTS");
        Menus.addMenuItem('sidebar', 'Showcase', 'showcases', null, '/showcase', false, null, null,'icon-docs', "sidebar.MENU_SHOWCASES");
        Menus.addMenuItem('sidebar', 'Biins', 'biins', null, '/biins', false, null, null,'icon-feed', "sidebar.MENU_BIINS");
        //Menus.addMenuItem('sidebar', 'NPS', 'nps', null, null, false, null, null,'fa fa-bar-chart', "sidebar.MENU_NPS");

        //menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position,iconClass, translateKey, alert)
        Menus.addMenuItem('sidebar', 'Administration', 'profile', 'dropdown', null, false, null, null,'fa fa-gears', "sidebar.MENU_ADMINISTRATION");

        //menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position, translateKey
        Menus.addSubMenuItem('sidebar', 'profile', 'Profile','profile', '/profile', false, null, null, "sidebar.MENU_PROFILE");
        Menus.addSubMenuItem('sidebar', 'profile', 'Organizations','organization', '/organization', false, null, null, "sidebar.MENU_ORGANIZATIONS");

        //Maintenance has role field: maintenance
        Menus.addMenuItem('sidebar', 'Maintenance', 'maintenance', null, '/maintenance', false, 'maintenance', null,'icon-settings',"sidebar.MENU_MAINTENANCE");
    }

})();
