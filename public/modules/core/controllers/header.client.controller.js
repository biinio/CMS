'use strict';

angular.module('app.core').controller('HeaderController', ['$scope', 'Authentication', 'Menus','Organization', '$window',
	function($scope, Authentication, Menus,Organization, $window) {
		init();

		function init() {
			$scope.authentication = Authentication;
		}
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

		$scope.logout = function() {
			var match = document.cookie.match(new RegExp('user=([^;]+)'));
			var now = new Date();

			now.setMonth( now.getMonth() - 1 );

			if (match) {
				$window.location = '/';
				document.cookie = 'user=; expires=' + now.toUTCString() + ';';
			}
		}
	}
]);
