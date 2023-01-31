var USER = require('../models/user');
var jwt = require('jsonwebtoken');

exports.Secure = async function (req, res, next) {
    try {
        let token = req.headers.id
        if(!token){
            throw new Error("token not available")
        }

        var decoded = jwt.verify(token, 'vivek');

        let usercheck = await USER.findById(decoded.id)
        if(!usercheck){
            throw new Error("user not found")

        }
        next()
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}


exports.Signup = async function (req, res, next) {
    try {
        if (req.body.password != req.body.cpassword) {
            throw new Error("password & cpassword are not same")
        }
        let data = await USER.create(req.body)
        var token = jwt.sign({ id:data._id }, 'vivek');
        res.status(200).json({
            status: "success",
            message: "signup successfull...",
            data: data,
            token
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}


exports.Signin = async function (req, res, next) {
    try {
        user = await USER.findOne({ email: req.body.email })
        if (!user) {
            throw new Error("user not found")
        }
        if (user.password != req.body.password) {
            throw new Error("wrong password")
        }
        var token = jwt.sign({ id:user._id }, 'vivek');
        res.status(200).json({
            status: "success",
            message: "login successfull...",
            data: user,
            token
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}


exports.Show = async function (req, res, next) {
    try {
        let data = await USER.find()
        res.status(200).json({
            status: "success",
            message: "show data successfull...",
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}

