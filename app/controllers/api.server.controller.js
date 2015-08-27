'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');

/**
 * Extend user's controller
 */
module.exports = _.extend(
	require('./api/users.api.server.controller'),
	require('./api/organization.api.server.controller')
);
