'use strict';

module.exports = {
	db: process.env.MONGOLAB_URL || 'mongodb://biinapp:ludusydb1@ds051738.mongolab.com:51738/dev',
	app: {
		title: 'Biin'
	},
	assets: {
		lib: {
			css: [
				// 'public/lib/bootstrap/dist/css/bootstrap.css',
				// 'public/lib/bootstrap/dist/css/bootstrap-theme.css',
			],
			js: [
				"public/dist/vendor.min.js",
				'//maps.googleapis.com/maps/api/js'
			]
		},
		css: [
			// 'public/modules/**/css/*.css'
			'public/dist/application.min.css',
			'public/lib/angularjs-toaster/toaster.css',
			'public/lib/animo.js/animate+animo.css',
			'public/lib/textAngular/dist/textAngular.css',
			'public/lib/bootstrap-tagsinput/dist/bootstrap-tagsinput.css',
			'public/lib/angular-datepicker/dist/angular-datepicker.css',
			'public/lib/loaders.css/loaders.css',
			'public/lib/seiyria-bootstrap-slider/dist/css/bootstrap-slider.min.css',
			'public/lib/nvd3/build/nv.d3.css',
			'public/lib/ng-img-crop/compile/minified/ng-img-crop.css',
			'public/lib/angular-color-picker/dist/angularjs-color-picker.min.css'
		],
		js: 'public/dist/application.min.js',
		tests: [
		]
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
