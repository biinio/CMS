'use strict';

// Setting up route
angular.module('biinUsers').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('page.login', {
			url: '/login',
			templateUrl: 'modules/biinUsers/views/login.client.view.html'
		});
	}
]);
