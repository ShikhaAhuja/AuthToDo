var user = require('../models/user');
var jwt = require('jsonwebtoken');

exports.registration = (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.json({
            success: false,
            message: 'Please Enter All Details'
        });
    }
    else {
        user.findOne({ email: req.body.email }, (err, loginData) => {
            if (err) {
                res.json({
                    success: false,
                    message: 'Database Error'
                });
            }
            else if (!loginData || loginData == null) {
                var newPerson = new user({
                    email: req.body.email,
                    password: req.body.password
                });
                newPerson.save((err, savedData) => {
                    if (err) {
                        res.json({ success: false, message: 'Error While saving Data' });
                    }
                    else {
                        res.json({ success: true, message: 'New Registration Done' });
                    }
                });
            }
            else {
                res.json({
                    success: false,
                    message: 'You have already Registered. Please Login'
                });
            }
        });
    }
}

exports.login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.json({
            success: false,
            message: 'Please Enter All Details'
        });
    }
    else {
        user.findOne({ email: req.body.email }, (err, loginData) => {
            if (err) {
                res.json({
                    success: false,
                    message: 'Database Error'
                });
            }
            else if (!loginData || loginData == null) {
                res.json({ success: false, message: 'No Such User Exist. Please Register Yourself' });
            }
            else if (loginData.password === req.body.password) {
                var tokenData = {email: loginData.email};
                var token = jwt.sign(tokenData,req.app.get('secret'));
                res.json({
                    success: true,
                    message: "Login Succesfull",
                    token: token
                });
            }
            else {
                res.json({
                    success: false,
                    message: 'Password Mismatch'
                });
            }
        });
    }
}




