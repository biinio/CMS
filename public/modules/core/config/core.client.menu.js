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
        Menus.addMenuItem('sidebar', 'Administration', 'administration', 'dropdown', null, false, null, null,'fa fa-gears', "sidebar.MENU_ADMINISTRATION");
        //this.addSubMenu   (menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
        Menus.addSubMenuItem('sidebar', 'administration', 'Profile','profile',null, false, null, null, "sidebar.MENU_PROFILE");
        Menus.addSubMenuItem('sidebar', 'administration', 'Organizaciones','organization',null, false, null, null, "sidebar.MENU_ORGANIZATIONS");
        Menus.addMenuItem('sidebar', 'Maintenance', 'maintenance', null, '/maintenance', false, null, null,'icon-settings',"sidebar.MENU_MAINTENANCE");
    }

})();
