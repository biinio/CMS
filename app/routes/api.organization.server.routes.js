/**
 * Created by Ivan on 8/21/15.
 */
'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function(app) {
    // Organization Routes
    var api = require('../../app/controllers/api.server.controller');

    app.route('/api/organization').get(api.organizationList);
    app.route('/api/organization/:identifier').put(api.setOrganization);
    app.route('/api/organization').post(api.setOrganization);
    app.route('/api/organization/:identifier').delete(api.deleteOrganization);


};
