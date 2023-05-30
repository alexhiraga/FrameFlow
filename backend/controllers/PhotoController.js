const Photo = require("../models/Photo")
const User = require("../models/User")
const mongoose = require("mongoose")
const moment = require('moment')

// Insert a photo, with an user related to it

const insertPhoto = async(req, res) => {
    const {title} = req.body
    const image = req.file.filename

    const reqUser = req.user;

    const user = await User.findById(reqUser._id);

    // Create a photo
    const newPhoto = await Photo.create({
        image,
        title,
        userId: user._id,
        userName: user.name,
        profileImage: user.profileImage
    });

    // If the photo was created successfully, return data
    if(!newPhoto) {
        return res.status(422).json({errors: ["An error occurred, please try again later."]})
    }
    res.json(newPhoto);
}

// Remove photo from DB
const deletePhoto = async(req, res) => {
    const {id} = req.params
    const reqUser = req.user

    try {
        const photo = await Photo.findById(new mongoose.Types.ObjectId(id))

        // Check if photo exists
        if(!photo) {
            return res.status(404).json({errors: ["Photo not found."]})
        }

        // Check if photo belongs to user
        if(!photo.userId.equals(reqUser._id)) {
            return res.status(422).json({errors: ["An error occurred, please try again later."]})
        }

        await Photo.findByIdAndDelete(photo._id);

        res.json({
            id: photo._id,
            message: "Photo deleted successfully!"
        })
    } catch (error) {
        return res.status(404).json({errors: ["Photo not found."]})
    }
    
};

// Get all photos
const getAllPhotos = async(req, res) => {
    const photos = await Photo.find({}).sort([["createdAt", -1]]).exec();
    return res.json(photos);
}

// Get user photos
const getUserPhotos = async(req, res) => {
    const {id} = req.params;

    try {
        const photos = await Photo.find({userId: id}).sort([["createdAt", -1]]).exec();
        res.json(photos);
    } catch (error) {
        res.status(404).json({errors: ["Photo not found."]})
    }
}

// Get photo by id
const getPhotoById = async(req, res) => {
    const {id} = req.params
    const photo = await Photo.findById(new mongoose.Types.ObjectId(id))

    // check if exists
    if(!photo){
        res.status(404).json({ errors: ["Photo not found."]})
        return
    }

    res.json(photo)
}

// Update a photo
const updatePhoto = async(req, res) => {
    const {id} = req.params
    const {title} = req.body

    const reqUser = req.user

    const photo = await Photo.findById(id)

    // check if exists
    if(!photo) {
        res.status(404).json({errors: ["Photo not found."]})
        return
    }

    // check if photo belongs to user
    if(!photo.userId.equals(reqUser._id)) {
        res.status(422).json({ errors: ["An error occurred, please try again later."]})
        return
    }

    if(title) {
        photo.title = title
    }

    await photo.save()

    res.json({photo, message: "Photo updated successfully!"})
};

// Like functionality
const likePhoto = async(req, res) => {
    const {id} = req.params
    const reqUser = req.user

    const photo = await Photo.findById(id)

    // check if exists
    if(!photo) {
        res.status(404).json({ errors: ["Photo not found"] })
        return
    }

    // check if user already liked the photo
    if(photo.likes.includes(reqUser._id)) {
        res.status(422).json({ errors: ["You have already liked this photo!"]})
        return
    }

    // put user id in likes array
    photo.likes.push(reqUser._id)
    await photo.save()

    res.json({ photoId: id, userId: reqUser._id, message: "Photo liked!"})
};

// Comment functionality
const commentPhoto = async(req, res) => {
    const {id} = req.params
    const {comment} = req.body

    const reqUser = req.user
    const user = await User.findById(reqUser._id)

    const photo = await Photo.findById(id)

    // check if exists
    if(!photo) {
        res.status(404).json({ errors: ["Photo not found"] })
        return
    }

    // put comment in the array of comments
    const userComment = {
        comment,
        userName: user.name,
        userImage: user.profileImage,
        userId: user._id,
        createdAt: moment().format()
    }

    photo.comments.push(userComment)
    await photo.save()

    res.json({
        comment: userComment,
        message: "Comment added successfully!"
    })
};

const searchPhotos = async(req, res) => {
    const {q} = req.query

    try {
        const photos = await Photo.find({title: new RegExp(q, "i")}).exec()
        res.json(photos)
    } catch (error) {
        res.status(404).json({ errors: ["Photo not found"] })
    }

}

module.exports = {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getUserPhotos,
    getPhotoById,
    updatePhoto,
    likePhoto,
    commentPhoto,
    searchPhotos,
}