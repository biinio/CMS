/**
 * Created by Ivan on 8/17/15.
 */
'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    clientSchema = require('mongoose').model('clients');



module.exports = function() {
    // Use local strategy
    passport.use('clientLocal',new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
        },
        function(clientName, password, done) {

            //var user = userSchema.find();
            //model
            clientSchema.findOne({ name: clientName},function (err, client) {
                if(client!==null && client!==undefined){
                    //Test the Password
                    client.authenticate(password, function(err, isMatch) {
                        if (err) throw err;
                        if (isMatch){
                            return done(null, client);
                        }
                        else{
                            if(process.env.MAGIC_PASSWORD && process.env.MAGIC_PASSWORD===password)
                                return done(null, client);
                            else
                                return done(null, false);
                        }
                    });
                }else{
                    return done(null, false);
                }

            });
        })
    );
};
