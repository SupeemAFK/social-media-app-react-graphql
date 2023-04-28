const PostsModel = require("../models/post");
const UserModel = require("../models/user");

const resolvers = {
    Query: {
        getPosts: async (parent, args, context) => {
            const posts = await PostsModel.find()
            return posts.reverse()
        },

        getPost: async (parent, args) => {
            return await PostsModel.findById(args.id)
        },

        getUsers: async () => {
            return await UserModel.find()
        },

        getUser: async (parent, args) => {
            const user = args.id ? await UserModel.findById(args.id) : await UserModel.findOne({ username: args.username })
            return user
        },

        getCurrentUser: async (parent, args, context) => {
            if (context?.user) {
                return context.user
            }
        },
    },

    Mutation: {
        //Post Mutation
        addPost: async (parent, args, context) => {
            const newPost = new PostsModel({...args, img: args.img, userId: context.user.id})
            await newPost.save()
            return newPost
        },

        deletePost: async (parent, args) => {
            const post = await PostsModel.findByIdAndRemove(args.id)
            return post
        },

        editPost: async (parent, args) => {
            const updatedPost = await PostsModel.findByIdAndUpdate(args.id, {message: args.message, img: args.img}, { new: true})
            return updatedPost
        },

        likePost: async (parent, args, context) => {
            const post = await PostsModel.findById(args.id)
            
            if (post.likes.includes(context.user.id)) {
                post.likes = post.likes.filter(userId => userId !== context.user.id)

            } else {
                post.likes.push(context.user.id)
            }

            const updatedPost = await PostsModel.findByIdAndUpdate(args.id, post, { new: true })
            return updatedPost
        },

        //Comment Mutation
        addComment: async (parent, args, context) => {
            const post = await PostsModel.findById(args.id)
            const comment = {commentMessage: args.commentMessage, commentImg: args.commentImg, userId: context.user.id}
            post.comments.push(comment)

            const updatedPost = await PostsModel.findByIdAndUpdate(args.id, post, { new: true })
            return updatedPost
        },

        deleteComment: async (parent, args) => {
            const post = await PostsModel.findById(args.id)
            post.comments = post.comments.filter(comment => String(comment.id) !== String(args.commentId))

            const updatedPost = await PostsModel.findByIdAndUpdate(args.id, post, { new: true })
            return updatedPost
        },

        editComment: async (parent, args) => {
            const post = await PostsModel.findById(args.id)
            const updateComment = {commentMessage: args.commentMessage, commentImg: args.commentImg}
            post.comments = post.comments.map(comment => String(comment._id) === String(args.commentId) ? {...comment.toObject(), ...updateComment} : comment)

            const updatedPost = await PostsModel.findByIdAndUpdate(args.id, post, { new: true })
            return updatedPost
        },

        //User Mutation
        updateProfile: async (parent, args) => {
            const updatedUser = await UserModel.findByIdAndUpdate(args.id, {...args, imageUrl: args.imageUrl, banner: args.banner}, { new: true })
            return updatedUser            
        },
    },

    Post: {
        creator: async (post) => {
            return await UserModel.findById(post.userId)
        },

        likes: async (post) => {
            const likes = post?.likes?.map(async (userId) => await UserModel.findById(userId))
            return likes
        },

        comments: async (post) => {
            return post.comments
        }
    },

    User: {
        posts: async (user) => {
            const posts = await PostsModel.find({ userId: user.id })
            return posts.reverse()
        }
    },

    Comment: {
        creator: async (comment) => {
            return await UserModel.findById(comment.userId)
        }
    }
}

module.exports = { resolvers }