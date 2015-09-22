'use strict';

module.exports = {
	app: {
		title: 'Biin',
		description: 'Biin Content Management System',
		keywords: 'MongoDB, Express, AngularJS, Node.js'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	MAGIC_PASSWORD: 'isaias123',
	assets: {
		lib: {
			css: [
				// 'public/lib/bootstrap/dist/css/bootstrap.css',
				// 'public/lib/bootstrap/dist/css/bootstrap-theme.css',
			],
			js: [
				'public/lib/jquery/dist/jquery.js',
				'public/lib/angular/angular.js',
				'public/lib/angular-route/angular-route.js',
				'public/lib/angular-cookies/angular-cookies.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-touch/angular-touch.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/ngstorage/ngStorage.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-sanitize/angular-sanitize.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-translate/angular-translate.js',
				'public/lib/angular-translate-loader-url/angular-translate-loader-url.js',
				'public/lib/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
				'public/lib/angular-translate-storage-local/angular-translate-storage-local.js',
				'public/lib/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
				'public/lib/oclazyload/dist/ocLazyLoad.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/angular-loading-bar/build/loading-bar.js',
				'public/lib/jquery.browser/dist/jquery.browser.js',
				'public/lib/angularjs-toaster/toaster.js',
				'public/lib/node-uuid/uuid.js',
				'public/lib/animo.js/animo.js',
				'public/lib/textAngular/dist/textAngular.min.js',
				'public/lib/textAngular/dist/textAngular-rangy.min.js',
				'public/lib/textAngular/dist/textAngularSetup.js',
				'public/lib/textAngular/dist/textAngular-sanitize.min.js',
                'public/lib/underscore/underscore.js',
                'public/lib/bootstrap-tagsinput/dist/bootstrap-tagsinput.js',
                'public/lib/bootstrap-tagsinput/dist/bootstrap-tagsinput-angular.js',
				'public/lib/angular-bind-html-compile/angular-bind-html-compile.js',
                'public/lib/angular-moment/angular-moment.js',
                'public/lib/angular-datepicker/dist/angular-datepicker.js'
				// 'public/lib/jquery/dist/jquery.js',
				// 'public/lib/angular/angular.js',
				// 'public/lib/angular-resource/angular-resource.js',
				// 'public/lib/angular-cookies/angular-cookies.js',
				// 'public/lib/angular-animate/angular-animate.js',
				// 'public/lib/angular-touch/angular-touch.js',
				// 'public/lib/angular-sanitize/angular-sanitize.js',
				// 'public/lib/angular-ui-router/release/angular-ui-router.js',
				// 'public/lib/angular-ui-utils/ui-utils.js',
				// 'public/lib/angular-bootstrap/ui-bootstrap-tpls.js'
			]
		},
		css: [
			// 'public/modules/**/css/*.css'
			'public/dist/application.min.css',
			'public/lib/angularjs-toaster/toaster.css',
			'public/lib/animo.js/animate+animo.css',
            'public/lib/textAngular/dist/textAngular.css',
            'public/lib/bootstrap-tagsinput/dist/bootstrap-tagsinput.css',
            'public/lib/angular-datepicker/dist/angular-datepicker.css'
        ],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};
