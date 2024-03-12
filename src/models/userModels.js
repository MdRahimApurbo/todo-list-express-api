const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({

    FirstName: { type: String },
    LastName: { type: String },
    EmailAddress: { 
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function(value) {
                // Using a regular expression to validate email format
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
     MobileNumber: { 
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: function(value) {
                // Validate mobile number format for Bangladesh (e.g., +8801XXXXXXXXX)
                return /^(?:\+?88)?01[3-9]\d{8}$/.test(value.toString());
            },
            message: props => `${props.value} is not a valid mobile number for Bangladesh!`
        }
    },
    City: { type: String },
    UserName: { type: String , unique: true},
    Password: { type: String }

},{versionKey:false});

const UsersModel = mongoose.model('users', DataSchema);
module.exports = UsersModel;