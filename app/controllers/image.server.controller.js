/**
 * Created by Ivan on 8/27/15.
 */
/*
 Image utility manager
 */
"use strict";
module.exports = function(){
    var path = require("path"),fs = require("fs"), uuid=require("node-uuid");
    var gm = require("gm"),imageMagick = gm.subClass({ imageMagick: true });
    var utils = require("./utils.server.controller")(), util=require("util");
    var azureManager = require("./azure.server.controller")();
    var functions={},
        _quality = 100,
        _workingImagePath='./public/workingFiles/',
        _uploadImageDirectory = "/workingFiles/";

    //*************** Region Methods **************

    //Upload an image
    functions.upload = function(originUrl,imagePath, imageName,callback){
        this.uploadFileAzure(originUrl,imagePath,imageName,function(err,succes){
            if(err){
                callback(err);
            }
            else
            {
                // obtain the size of an image
                imageMagick(succes.localPath).size(function(err, value){

                    if (err) throw err;
                    succes.width = value.width;
                    succes.height = value.height;

                    delete succes.localPath;
                    callback(err,succes);
                });
            }
        });
    };

    //Crop an Image
    functions.cropImage = function(pixelEquival,moduleOwner, imageUrl, resizeW, resizeH, cropW, cropH, positionX, positionY, callback){
        var that = this;
        var imageName= path.basename(imageUrl);
        var pathImage = _workingImagePath+imageName;

        //Pixel ajustment for cropper
        resizeW*=pixelEquival;
        resizeH*=pixelEquival;
        cropH*=pixelEquival;
        cropW*=pixelEquival;
        positionX*=pixelEquival;
        positionY*=pixelEquival;

        var imageFTPPath="";
        switch(moduleOwner){
            case "showcase":imageFTPPath=process.env.FTP_BIIN_IMAGES_URL;
                break;
        }		//Image magic convertion

        imageMagick(pathImage)
            .resize(resizeW*pixelEquival, resizeH)
            .crop(cropW,cropH,positionX,positionY)
            //.quality(_quality)
            .write(pathImage,function(err,data){
                if (err)
                    callback(err);
                else{
                    that.copyToFtp(pathImage,imageFTPPath,imageName,function(err){
                        if(err)
                            callback(err);
                        else{
                            var jsonObj = {
                                status:"success",
                                url:"http://"+process.env.FTP_HOST+imageFTPPath+imageName
                            };
                            callback(err,jsonObj);
                        }
                    });
                }
            });
    };

    //Uploads an imag
    functions.uploadFile = function(imagePath,directory, imageName,callback){
        this.uploadFileAzure(imagePath, directory, imageName,true,callback);
    };

    functions.uploadFile = function(imagePath,directory, imageName,generateName,callback){
        this.uploadFileAzure(imagePath, directory, imageName,generateName,callback);
    };

    //Uploads an imag
    functions.uploadFileAzure = function(imagePath,directory, imageName, generateName,callback){
        var mainContainer=  process.env.AZURE_CONTAINER;


        var systemImageName ="";//path.join(directory,utils.getImageName(imageName,_workingImagePath));
        var imageFormat =utils.getExtension(imageName);
        if(generateName)
            systemImageName =path.join(directory,utils.getImageName(imageName,_workingImagePath));
        else
            systemImageName =path.join(directory,imageName);

        var newPath = process.env.IMAGES_REPOSITORY_AZURE+"/"+systemImageName;
        var sizeExtend =process.env.STANDARD_IMAGE_HEIGHT + "x"+process.env.STANDARD_IMAGE_WIDTH;

        imageMagick(imagePath)
            .resize( process.env.STANDARD_IMAGE_WIDTH, process.env.STANDARD_IMAGE_HEIGHT)
            .crop( process.env.STANDARD_IMAGE_WIDTH, process.env.STANDARD_IMAGE_HEIGHT,0,0)
            .geometry(process.env.STANDARD_IMAGE_WIDTH+'!', process.env.STANDARD_IMAGE_HEIGHT+"!")
            .gravity('Center')
            .quality(process.env.STANDARD_IMAGE_QUALITY)
            .toBuffer(function (err, buffer) {
                azureManager.uploadObjectToContainer(mainContainer, systemImageName,buffer,imageFormat,function(data){
                    callback(newPath);
                });
            });
    };

    return functions;
};