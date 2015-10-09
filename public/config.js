'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'BiinCMSApp';

	var applicationBackendURL = 'https://qa-biinapp.herokuapp.com/';

	var applicationModuleVendorDependencies = ['ngRoute', 'ngAnimate', 'ngStorage', 'ngTouch', 'ngCookies',
        'pascalprecht.translate', 'ui.bootstrap', 'ui.router', 'oc.lazyLoad', 'cfp.loadingBar', 'ngSanitize',
        'ngResource', 'ui.utils','ngAnimate', 'toaster','textAngular','bootstrap-tagsinput','angular-bind-html-compile','datePicker'];
	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule,
		applicationBackendURL: applicationBackendURL
	};
})();
