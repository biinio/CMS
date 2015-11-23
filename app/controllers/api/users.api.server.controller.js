'use strict';

/**
 * Module dependencies.
 */

//Passport Login
var passport = require('passport');

var _ = require('lodash'),
    mongoose = require('mongoose'),
    client  = mongoose.model('clients'),
    roles  = mongoose.model('roles');


/**
 * Signin after passport authentication
 */
exports.loginCMS = function (req, res, next) {
    passport.authenticate('clientLocal', function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).send({
                    "message":"Wrong credentials"
                });
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                //Get role permission
                else if(user.role) {
                    user = user.toObject();
                    roles.find({
                        "role": user.role
                    }, {
                        permission: 1
                    }).lean().exec(function(err, data) {
                        if(err)
                            res.send(err, 500);
                        else {
                            user.permissions = data;
                            return res.status(200).send({
                                "account": user
                            });
                        }

                    });
                }
            });
        }
    )
    (req, res, next);
};

/**
 * Get user information
 */
exports.list = function(req,res){
    res.setHeader('Content-Type', 'application/json');
    var data= {};

    //Get the Profile Information
    client.findOne({name:req.user.name},{profilePhoto:1,displayName:1,lastName:1,name:1,emails:1,phoneNumber:1, defaultOrganization:1, accountIdentifier:1, selectedOrganization:1, role:1},function(err,data){
        if(err)
            res.send(err, 500);
        else
            res.json({data:data});
    });
};

exports.set =function(req,res){
    var model =req.body.model;
    if(!req.user || !model.name)
    {
        res.send("Error",500);
    }
    else{
        var identifier= req.user.name;

        var updateModel =
        {
            name:model.name,
            displayName:model.displayName? model.displayName:"",
            lastName:model.lastName?model.lastName:"",
            emails:model.emails?model.emails:[],
            phoneNumber:model.phoneNumber ?model.phoneNumber:""
        };

        //Update the client data
        client.update({name: identifier },updateModel,function(err){
            if(err)
                res.send(err, 500);
            else
            {
                req.user.name = updateModel.name;
                req.user.displayName=updateModel.displayName;
                req.user.lastName=updateModel.lastName;
                req.user.emails=updateModel.emails;
                req.user.phoneNumber=updateModel.phoneNumber;
                if(identifier == updateModel.name)
                    res.status(200).send({needToRelog:false});
                else {
                    res.status(200).send({needToRelog:true});
                }
            }
        });
    }
};
