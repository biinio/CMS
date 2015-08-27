/**
 * Created by Ivan on 8/21/15.
 */
'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    mongoose = require('mongoose'),
    organization  = mongoose.model('organizations'),
    site  = mongoose.model('sites'),
    showcase  = mongoose.model('showcases'),
    client  = mongoose.model('clients'),
    uuid = require('node-uuid');

//GET the list of organizations
exports.organizationList = function(req,res){
    res.setHeader('Content-Type', 'application/json');
    organization.find({"accountIdentifier":req.user.accountIdentifier},{_id:0,identifier:1,name:1,brand:1,description:1,extraInfo:1,media:1},function (err, data) {
        res.json({data:data});
    });
};

//PUT/POST an organization
exports.setOrganization=function(req,res){
    //Perform an update
    var organizationIdentifier=req.param("identifier");
    res.setHeader('Content-Type', 'application/json');

    //If is pushing a new model
    if(typeof(organizationIdentifier)==="undefined"){
        var newModel = new organization();
        organizationIdentifier = uuid.v4();

        //Set the account and de user identifier
        newModel.identifier=organizationIdentifier;
        newModel.accountIdentifier= req.user.accountIdentifier;

        //Perform an create
        newModel.save(function(err){
            if(err)
                res.send(err, 500);
            else{
                //Return the state and the object
                res.send(newModel, 201);
            }
        });
    }else{
        var model = req.body.model;
        delete model._id;
        delete model.identifier;
        organization.update(
            { identifier:organizationIdentifier},
            { $set :model },
            { upsert : false },
            function(err){
                if(err)
                    res.send(err, 500);
                else
                //Return the state
                    res.send(model,200);
            }
        );
    }
};

//DELETE an specific Organization
exports.deleteOrganization= function(req,res){

    //Get the organization identifier
    var organizationIdentifier=req.param("identifier");

    organization.findOne({identifier:organizationIdentifier, accountIdentifier:req.user.accountIdentifier},function(err,data){
        //Remove Sites and References
        for(var s=0; s<data.sites.length;s++){
            var removeSite = regionRoutes.removeSiteToRegionBySite(data.sites[s].identifier,function(){});
        }


        //Remove the showcases references
        showcase.remove({'organizationIdentifier':organizationIdentifier},function(err,affected){
            if(err)
                throw err;
            else
            {
                //Remove the organization
                organization.remove({identifier:organizationIdentifier, accountIdentifier:req.user.accountIdentifier},function(err){
                    if(err)
                        throw err;
                    else
                        res.json({state:"success"});
                });
            }
        });
    });
};
