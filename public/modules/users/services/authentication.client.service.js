'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', ['$window',
	function($window) {
		var _this = this;
		var user;
		var match = document.cookie.match(new RegExp('user=([^;]+)'));

		if (match) user = JSON.parse(match[1]);
		
		_this._data = {
			user: user
		};

		return _this._data;
	}
]);
