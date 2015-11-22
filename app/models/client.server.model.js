'use strict';

var mongoose = require('mongoose'),
	crypto = require('crypto'),
	bcrypt = require('bcrypt'),
	SALT_WORK_FACTOR=10;

var Schema = mongoose.Schema;
var clientSchema = new Schema({
	name: {type:String, required:true,index:{unique:true}},
	password:{type:String, required:true},
	displayName:{type:String, default:""},
	lastName:{type:String, default:""},
	phoneNumber:{type:String, default:""},
	addres:{type:String, default:""},
	accountIdentifier:{type:String, default:""},
	emails:[],
	salt: {type: String},
	joinDate:{type:Date, default:""},
	profilePhoto:{type:String, default:""},
	defaultOrganization:{type:String,default:""},
	accountState:{type:Boolean,default:false},
	selectedOrganization:{type:String,default:""}
});


/**
 * Hook a pre save method to hash the password
 */
clientSchema.pre('save', function(next) {
	if (this.password && this.password.length > 6) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}

	next();
});

/**
 * Create instance method for hashing a password
 */
clientSchema.methods.hashPassword = function(password) {
	if (this.salt && password) {
		return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
	} else {
		return password;
	}
};


/**
 * Create instance method for authenticating user
 */
clientSchema.methods.authenticate = function(password,cb) {
	/*if(this.password === this.hashPassword(password))
		cb(null, true);
	else
	    cb(null, false);*/
	bcrypt.compare(password, this.password, function(err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};



module.exports = mongoose.model('clients',clientSchema);
