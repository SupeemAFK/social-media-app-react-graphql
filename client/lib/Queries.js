import { gql } from '@apollo/client'

export const GET_POSTS = gql`
    query GetPosts{
        getPosts {
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
        }
    }
`

export const GET_POST = gql`
    query GetPost($id: String) {
        getPost(id: $id) {
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

export const GET_COMMENTS = gql`
    query GetPost($id: String) {
        getPost(id: $id) {
            id
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

export const GET_CURRENT_USER = gql`
    query GetCurrentUser {
        getCurrentUser {
            id
            username
            name
            email
            imageUrl
            isVerified
            two_factor_enabled
        }
    }
`

export const GET_USER = gql`
    query GetUser($id: String, $username: String) {
        getUser(id: $id, username: $username) {
            id
            email
            username
            name
            bio
            banner
            imageUrl
            posts {
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
    }
`
