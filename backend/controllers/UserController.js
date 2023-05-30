const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose")

const jwtSecret = process.env.JWT_SECRET;

// generate user token
const generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret, {
        expiresIn: "7d",
    });
};

// register user and sign in
const register = async(req, res) => {

    const { name, email, password } = req.body

    // check if user exists
    const user = await User.findOne({email})

    if(user) {
        res.status(422).json({ errors: ["Email already used!"]})
    }

    // generate pw hash
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    // create user
    const newUser = await User.create({
        name,
        email,
        password: passwordHash
    })

    // if used was created successfully, return token
    if(!newUser) {
        res.status(422).json({ errors: ["An error occurred, please try again later"]})
        return
    }

    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id),
    })

};

// Sign user in
const login = async(req, res) => {

    const {email, password} = req.body
    const user = await User.findOne({email})

    //check if user exists
    if(!user) {
        res.status(404).json({errors: ["User not found."]})
        return
    }

    //check if password matches
    if(!(await bcrypt.compare(password,user.password))) {
        res.status(422).json({errors: ["Invalid email or password."]})
    }

    //return user with token
    res.status(201).json({
        _id: user._id,
        profileImage: user.profileImage,
        name: user.name,
        token: generateToken(user._id),
    })
}

// Get current logged in user
const getCurrentUser = (req, res) => {
    const user = req.user;
    res.json(user);
}

// Update an user
const update = async(req, res) => {
    const {name, password, bio} = req.body

    let profileImage = null

    if(req.file) {
        profileImage = req.file.filename
    }

    const reqUser = req.user

    const user = await User.findById(new mongoose.Types.ObjectId(reqUser._id)).select("-password")

    if(name) {
        user.name = name
    }

    if(password) {
        // generate pw hash
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)

        user.password = passwordHash
    }

    if(profileImage) {
        user.profileImage = profileImage
    }

    if(bio) {
        user.bio = bio
    }

    await user.save()
    res.status(200).json(user);
};

const getUserById = async(req, res) => {
    const {id} = req.params

    try {
        const user = await User.findById(new mongoose.Types.ObjectId(id)).select("-password")
        //Check if user exists
        if(!user) {
            return res.status(404).json({errors: ["User not found."]})
        }

        return res.json(user);
    } catch (error) {
        res.json({errors: ["User not found."]})
        return
    }

    
}

module.exports = {
    register,
    login,
    getCurrentUser,
    update,
    getUserById,
}

