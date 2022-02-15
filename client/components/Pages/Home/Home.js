import React, { useContext } from 'react'
import { CreatePostFormContext } from '../../../pages/_app'

//styles
import { HomePage } from './Home.styles' 

//components
import Posts from '../../Posts/Posts'
import Form from '../../Form/Form'
import CreatePost from '../../CreatePost/CreatePost'

export default function Home() {
    const { createPostForm } = useContext(CreatePostFormContext)

    return (
        <HomePage>
            {createPostForm.isOpenForm && <Form />}
            <CreatePost />
            <Posts />
        </HomePage>
    )
}
