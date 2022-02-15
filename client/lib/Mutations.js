import { gql } from '@apollo/client'

//User
export const UPDATE_USER_PROFILE = gql`
    mutation UpdateProfile($name: String, $bio: String, $banner: Upload, $imageUrl: Upload, $id: String) {
        updateProfile(name: $name, bio: $bio, banner: $banner, imageUrl: $imageUrl, id: $id) {
            id
            username
            name
            bio
            banner
            imageUrl
            email
        }
    }
`


//Post
export const CREATE_POST = gql`
    mutation CreatePost($img: [Upload], $message: String) {
        addPost(img: $img, message: $message) {
            id
            message
            img
            createdAt
            creator {
                id
                username
                name
                imageUrl
            }
            likes {
                id
                username
                name
            }
            comments {
                id
                commentMessage
                commentImg
                creator {
                    id
                    username
                    name
                    imageUrl
                }
            }
        }
    }
` 

export const EDIT_POST = gql`
    mutation EditPost($img: [Upload], $message: String, $id: String) {
        editPost(img: $img, message: $message, id: $id) {
            id
            message
            img
            createdAt
            creator {
                id
                username
                name
                imageUrl
            }
            likes {
                id
                username
                name
            }
            comments {
                id
                commentMessage
                commentImg
                creator {
                    id
                    username
                    name
                    imageUrl
                }
            }
        }
    }
`

export const DELETE_POST = gql`
    mutation DeletePost($id: String) {
        deletePost(id: $id) {
            id
        }
    }
`

export const LIKE_POST = gql`
    mutation LikePost($id: String) {
        likePost(id: $id) {
            id
            likes {
                id
                username
                name
            }
        }
    }
`

export const ADD_COMMENT = gql`
    mutation AddComment($commentImg: Upload, $commentMessage: String, $id: String) {
        addComment(commentImg: $commentImg, commentMessage: $commentMessage, id: $id) {
            id
            message
            img
            createdAt
            creator {
                id
                username
                name
                imageUrl
            }
            likes {
                id
                username
                name
            }
            comments {
                id
                commentMessage
                commentImg
                creator {
                    id
                    username
                    name
                    imageUrl
                }
            }
        }
    }
`

export const EDIT_COMMENT = gql`
    mutation EditComment($commentImg: Upload, $commentMessage: String, $id: String, $commentId: String) {
        editComment(commentImg: $commentImg, commentMessage: $commentMessage, id: $id, commentId: $commentId) {
            id
            message
            img
            createdAt
            creator {
                id
                username
                name
                imageUrl
            }
            likes {
                id
                username
                name
            }
            comments {
                id
                commentMessage
                commentImg
                creator {
                    id
                    username
                    name
                    imageUrl
                }
            }
        }
    }
`

export const DELETE_COMMENT = gql`
    mutation DeleteComment($id: String, $commentId: String) {
        deleteComment(id: $id, commentId: $commentId) {
            id
            message
            img
            createdAt
            creator {
                id
                username
                name
                imageUrl
            }
            likes {
                id
                username
                name
            }
            comments {
                id
                commentMessage
                commentImg
                creator {
                    id
                    username
                    name
                    imageUrl
                }
            }
        }
    }
`
