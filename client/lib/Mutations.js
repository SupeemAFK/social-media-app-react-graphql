import { gql } from '@apollo/client'

//Auth
export const SIGNIN = gql`
    mutation Signin($credentials: String, $password: String) {
        signin(credentials: $credentials, password: $password) {
            accessToken
            refreshToken
        }
    }
`

export const SIGNUP = gql`
    mutation Signup($email: String, $password: String, $username: String) {
        signup(email: $email, password: $password, username: $username) {
            accessToken
            refreshToken        
        }
    }
`

export const GOOGLE_SINGIN = gql`
    mutation GoogleSignin($tokenId: String) {
        googleSignin(tokenId: $tokenId) {
            accessToken
            refreshToken        
        }
    }
`

export const SIGNOUT = gql`
    mutation Signout($refreshToken: String) {
        signout(refreshToken: $refreshToken) {
            refreshToken
        }
    }
`

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

export const UPDATE_USER_EMAIL = gql`
    mutation UpdateEmail($currentPassword: String, $newEmail: String, $id: String) {
        updateEmail(currentPassword: $currentPassword, newEmail: $newEmail, id: $id) {
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

export const UPDATE_USER_USERNAME= gql`
    mutation UpdateUsername($currentPassword: String, $newUsername: String, $id: String) {
        updateUsername(currentPassword: $currentPassword, newUsername: $newUsername, id: $id) {
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

export const UPDATE_USER_PASSWORD = gql`
    mutation UpdatePassword($currentPassword: String, $newPassword: String, $id: String) {
        updatePassword(currentPassword: $currentPassword, newPassword: $newPassword, id: $id) {
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