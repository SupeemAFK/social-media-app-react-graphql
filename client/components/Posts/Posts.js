import React from 'react'

//styles and icons
import { CircularProgress } from '@mui/material'
import { PostsContainer } from './Posts.styles'

//graphql
import { useQuery } from '@apollo/client'
import { GET_POSTS } from '../../lib/Queries'

//components
import Post from './Post/Post'

export default function Posts() {
    const { data, loading, error } = useQuery(GET_POSTS)

    if (loading) {
        return (
            <PostsContainer>
                <CircularProgress color="primary" />
            </PostsContainer>
        )
    }

    return (
        <PostsContainer>
            {data?.getPosts?.map(post => <Post key={post.id} post={post} />)}
        </PostsContainer>
    )

}
