'use strict';

// Configuring the Articles module
angular.module('dashboard').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		//addMenuItem(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position, iconClass, translateKey, alert)
		//Menus.addSubMenuItem('sidebar', 'articles', 'List Articles', 'articles');
		//Menus.addSubMenuItem('sidebar', 'articles', 'New Article', 'articles/create');

	}
]);
