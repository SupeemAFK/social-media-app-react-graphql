const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    img: {
        type: [String],
        default: []
    },
    message: String,
    userId: String,
    likes: {
        type: [String],
        default: []
    },
    comments: {
        type: [
            { commentMessage: String, commentImg: String, userId: String}
        ],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const PostsModel = mongoose.model('Posts', postSchema);
module.exports = PostsModel;