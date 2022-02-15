const { gql } = require('apollo-server-express')

const typeDefs = gql`
    scalar Upload

    type Post {
        id: String,
        img: [String],
        message: String,
        creator: User,
        userId: String,
        likes: [User],
        comments: [Comment],
        createdAt: String
    }

    type User {
        id: String,
        email: String,
        username: String,
        name: String,
        bio: String,
        banner: String,
        imageUrl: String,
        posts: [Post],
        isVerified: Boolean,
        two_factor_enabled: Boolean,
    }

    type Comment {
        id: String,
        creator: User,
        commentMessage: String,
        commentImg: String,
        userId: String,
    }

    type File {
        url: String
        filename: String
        mimetype: String
        encoding: String
    }

    #Main Query
    type Query {
        getPosts: [Post]
        getPost(id: String): Post
        getUsers: [User]
        getUser(id: String, username: String): User
        getCurrentUser: User
    }

    #Main Mutation
    type Mutation {
        #Post mutaion
        addPost(img: [Upload], message: String): Post
        deletePost(id: String): Post 
        editPost(img: [Upload], message: String, id: String): Post
        likePost(id: String): Post

        #Comment mutaion
        addComment(commentImg: Upload, commentMessage: String, id: String): Post
        deleteComment(id: String, commentId: String): Post
        editComment(commentImg: Upload, commentMessage: String, id: String, commentId: String): Post

        #User Mutation
        updateProfile(name: String, bio: String, banner: Upload, imageUrl: Upload, id: String): User
    }
`

module.exports = { typeDefs }