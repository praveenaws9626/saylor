const User = require('../models/User');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const superSecret = process.env.SECRET_KEY;

const loginController = {
    registerUser : async (req, res, next) => {
        try {
            let {email, password, name} = req.body;
            const user = await User.findOne({ email: email });
            // Create new User
            if (!user) {
                const newUser = new User({ email, password, name });
                // Hash password before saving in database
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(newUser.password, salt);
                newUser.password = hash;
                await newUser.save();
                return res.status(200).json({ errors: "User Registered Successfully" });
            } else {
                return res.status(400).json({ errors: "User Already Exists" });
            }
        } catch(error) {
            throw new Error(error);
        }
    },

    loginUser : async (req, res, next) => {
        try {
            let {email, password} = req.body;
            const user = await User.findOne({ email: email });
            // Create new User
            if (user) {
                // Compare Hash password before return success
                let match = await bcrypt.compare(password, user.password);
                if (match) {
                    let userDetails = user.toJSON();
                    delete userDetails.password;
                    delete userDetails.action_date;
                    let token = 'JWT ' + jwt.sign(user.toJSON(), superSecret);
                    let data = {
                        ...userDetails,
                        token
                    }
                    return res.status(200).json(data);
                } else {
                    return res.status(400).json({ errors: "Wrong Password" });
                }
            } else {
                return res.status(400).json({ errors: "User Doesn't exists" });
            }
        } catch(error) {
            console.log(error);
            throw new Error(error);
        }
    }
}

module.exports = loginController;