'use strict';
/**
 * Created by Ivan on 8/21/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var elementSchema = new Schema({

    elementIdentifier:{type:String, default:"-1", index:true},
    organizationIdentifier:{type:String,default:""},
    accountIdentifier:{type:String,default:""},
    position:{type:String, default:"1"},
    elementType:{type:String, default:""},

    title:{type:String, default:""},
    subTitle:{type:String, default:""},

    searchTags:[],
    sticker:{identifier:{type:String, default:""}, color:{type:String,default:""}},

    textColor:{type:String, default:""},
    domainColor:{type:String, default:""},

    actionType:{type:String, default:""},
    currencyType:{type:String, default:"2"},

    hasFromPrice:{type:String, default:"0"},
    //fromPrice:{type:String, default:""},
    hasListPrice:{type:String, default:'0'},
    listPrice:{type:String, default:""},
    hasPrice:{type:String, default:"0"},
    price:{type:String, default:""},

    //Is highlight element
    isHighlight:{type:String, default:'0'},

    hasDiscount:{type:String, default:'0'},
    discount:{type:String, default:""},
    hasSaving:{type:String, default:'0'},
    savings:{type:String, default:""},

    hasTimming:{type:String,default:"0"},
    initialDate:{type:Date,default:""},
    expirationDate:{type:Date,default:""},

    hasQuantity:{type:Boolean,default:0},
    quantity:{type:String,default:""},

    details:[{
        elementDetailType:{type:String, default:""},
        text:{type:String,default:""},
        body:[{
            line:{type:String,default:""},
            description:{type:String,default:""},//Use for type 6
            currencyType:{type:String,default:""}//Use for type  6
        }]
    }],
    categories:[
        {
            identifier:{type:String, index:true, default:"-1"},
            name:{type:String, default:""},
            displayName:{type:String, default:""},
            imgUrl:{type:String, default:""}
        }
    ],
    media:[{
        identifier:{type:String, default:""},
        title1:{type:String, default:""},
        url:{type:String,default:""},
        mediaType:{type:String,default:""},
        mainColor:{type:String,default:""}
    }],
    biinedCount:{type:Number,default:0},
    sharedCount:{type:Number,default:0},
    commentedCount:{type:Number,default:0},

    isReady: {type:Number, default:0}
});

module.exports = mongoose.model('elements', elementSchema);
