(function () {
    'use strict';

    angular
        .module('app.core')
        .run(coreMenu);

    coreMenu.$inject = ['Menus'];
    function coreMenu(Menus) {
        // Add default menu entry
        //Menus.addMenuItem('sidebar', 'Home', 'home', null, '/home', true, null, null, 'icon-home');
        Menus.addMenuItem('sidebar', 'Dashboard', 'dashboard', null, '/dashboard', false, null, null,'icon-speedometer',null);
        Menus.addMenuItem('sidebar', 'Sites', 'sites', null, '/sites', false, null, null,'icon-pointer',null);
        Menus.addMenuItem('sidebar', 'Elements', 'elements', null, '/elements', false, null, null,'icon-book-open',null);
        Menus.addMenuItem('sidebar', 'Showcase', 'showcases', null, '/showcase', false, null, null,'icon-docs',null);
        Menus.addMenuItem('sidebar', 'Biins', 'biins', null, '/biins', false, null, null,'icon-feed',null);
        Menus.addMenuItem('sidebar', 'Administration', 'profile', 'dropdown', null, false, null, null,'fa fa-gears');
        //this.addSubMenu   (menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
        Menus.addSubMenuItem('sidebar', 'profile', 'Profile','profile',null, false, null, null);
        Menus.addSubMenuItem('sidebar', 'profile', 'Organizaciones','organization',null, false, null, null);
        Menus.addMenuItem('sidebar', 'Maintenance', 'maintenance', null, '/maintenance', false, null, null,'icon-settings',null);
    }

})();
