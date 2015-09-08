'use strict';

angular.module('app.core').controller('HeaderController', ['$scope', 'Authentication', 'Menus','Organization',
	function($scope, Authentication, Menus,Organization) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');
		$scope.organizationService = Organization;

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});

	}
]);
