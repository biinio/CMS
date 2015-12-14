'use strict';

module.exports = {
	db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/angle',
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
				'public/lib/textAngular/dist/textAngular.js',
				'public/lib/textAngular/dist/textAngular-rangy.min.js',
				'public/lib/textAngular/dist/textAngularSetup.js',
				'public/lib/textAngular/dist/textAngular-sanitize.js',
				'public/lib/underscore/underscore.js',
				'public/lib/bootstrap-tagsinput/dist/bootstrap-tagsinput.js',
				'public/lib/bootstrap-tagsinput/dist/bootstrap-tagsinput-angular.js',
				'public/lib/angular-bind-html-compile/angular-bind-html-compile.js',
				'public/lib/angular-moment/angular-moment.js',
				'public/lib/angular-datepicker/dist/angular-datepicker.js',
				'public/lib/blueimp-canvas-to-blob/js/canvas-to-blob.min.js',
				'public/lib/blueimp-tmpl/js/tmpl.min.js',
				'public/lib/blueimp-load-image/js/load-image.all.min.js',
				'public/lib/blueimp-file-upload/js/vendor/jquery.ui.widget.js',
				'public/lib/blueimp-file-upload/js/jquery.iframe-transport.js',
				'public/lib/blueimp-file-upload/js/jquery.fileupload.js',
				'public/lib/blueimp-file-upload/js/jquery.fileupload-process.js',
				'public/lib/blueimp-file-upload/js/jquery.fileupload-angular.js',
				'public/lib/loaders.css/loaders.css.js',
				'//maps.googleapis.com/maps/api/js',
				'public/lib/moment/min/moment.min.js',
				'public/lib/angular-bootstrap-slider/slider.js',
				'public/lib/seiyria-bootstrap-slider/dist/bootstrap-slider.min.js',
				'public/lib/angular-dragdrop/src/angular-dragdrop.min.js',
				'public/lib/jquery-ui/jquery-ui.js',
				'public/lib/d3/d3.js',
				'public/lib/nvd3/build/nv.d3.js',
				'public/lib/angular-nvd3/dist/angular-nvd3.js',
				'public/lib/ng-img-crop/compile/minified/ng-img-crop.js'

			]
		},
		css: [
			'public/dist/application.min.css',
			'public/lib/angularjs-toaster/toaster.css',
			'public/lib/animo.js/animate+animo.css',
			'public/lib/textAngular/dist/textAngular.css',
			'public/lib/bootstrap-tagsinput/dist/bootstrap-tagsinput.css',
			'public/lib/angular-datepicker/dist/angular-datepicker.css',
			'public/lib/loaders.css/loaders.css',
			'public/lib/seiyria-bootstrap-slider/dist/css/bootstrap-slider.min.css',
			'public/lib/nvd3/build/nv.d3.css',
			'public/lib/ng-img-crop/compile/minified/ng-img-crop.css'
		],
		js: 'public/dist/application.min.js'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || 'APP_ID',
		clientSecret: process.env.FACEBOOK_SECRET || 'APP_SECRET',
		callbackURL: '/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
		clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
		callbackURL: '/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || 'APP_ID',
		clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
		callbackURL: '/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'APP_ID',
		clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
		callbackURL: '/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'APP_ID',
		clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
		callbackURL: '/auth/github/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};
