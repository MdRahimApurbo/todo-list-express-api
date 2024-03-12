const UsersModel = require('../models/userModels')
const jwt = require('jsonwebtoken');


// Create Users
exports.CreateUser = async (req, res) => {
    try {

        let reqBody = req.body;
        let createdProfile = await UsersModel.create(reqBody);
        res.status(200).json({ status: 'Success', message: 'Users Created Successfully', profile: createdProfile });

    } catch (err) {

        res.status(401).json({ status: 'Not Success', message: err });
        
    }
}

// Login Users Profile

exports.LoginProfile = async (req, res) => {
    try {
        
        let UserName = req.body['UserName'];
        let Password = req.body['Password'];

        // Using await to wait for the result of the query
        let UserProfile = await UsersModel.findOne({ UserName: UserName, Password: Password });

        //Jwt Token Create
        let payload = {

            exp: Math.floor(Date.now() / 1000) + (24*60*60),
            data:UserProfile

        }

        let token = jwt.sign(payload, 'apurbo123');


        if (UserProfile) {
            res.status(200).json({ status: 'Success', message: 'Login Successfully', token:token, profile: UserProfile });
        } else {
            res.status(404).json({ status: 'Failure', message: 'Invalid UserName or Password' });
        }

    } catch (err) {
        res.status(500).json({ status: 'Error', message: err.message });
    }
}

// View Profile

exports.UsersProfile = async (req, res) => {
    try {
        
        let UserName = req.headers['UserName'] ;
        let UserProfile = await UsersModel.findOne({ UserName: UserName});

        if (UserProfile) {
            res.status(200).json({ status: 'Success', message: 'Profile View Successfully' , profile: UserProfile });
        } else {
            res.status(404).json({ status: 'Failure', message: 'Invalid UserName or Password' });
        }

    } catch (err) {
        res.status(500).json({ status: 'Error', message: err.message });
    }
}

// Update Profile

exports.UpdateProfile = async (req, res) => {
    try {

        let reqBody = req.body;
        let UserName = req.headers['UserName'];

        let userProfile = await UsersModel.findOneAndUpdate({ UserName: UserName }, reqBody, { new: true });

        if (userProfile) {
            res.status(200).json({ status: 'Success', message: 'Profile Updated Successfully', profile: userProfile });
        } else {
            res.status(404).json({ status: 'Failure', message: 'User profile not found' });
        }

    } catch (err) {
        res.status(500).json({ status: 'Error', message: err.message });
    }
}