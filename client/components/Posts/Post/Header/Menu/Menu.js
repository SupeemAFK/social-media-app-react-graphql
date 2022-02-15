import React, { useContext } from 'react'
import { CreatePostFormContext } from '../../../../../pages/_app'
import { urlToFile } from '../../../../../utils/imgPathToFile'
//auth
import { useSessionUser } from '../../../../../auth/getSessionUser'

//styles and icon
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { StyledMenu, StyledMenuItem } from '../../../../../styles/GlobalStyles'
import { CircularProgress } from '@mui/material'

//graphql
import { useMutation } from '@apollo/client'
import { DELETE_POST } from '../../../../../lib/Mutations'
import { GET_POSTS, GET_USER } from '../../../../../lib/Queries'

export default function Menu({ post, id, anchorEl, setAnchorEl, open }) {
    const { data } = useSessionUser()
    const { createPostForm, setCreatePostForm } = useContext(CreatePostFormContext)

    const [deletePost, { loading: deletePostLoading }] = useMutation(DELETE_POST, {
        onError: (deletePostError) => {
            console.error(deletePostError)
        }
    })

    async function setEditPostForm() {
        setAnchorEl(null)

        if (post.img === "") {
            setCreatePostForm({...createPostForm, ...post, isOpenForm: true})
            return
        }
        const imgFileArray = await Promise.all(post.img.map(async (imageUrl) => await urlToFile(imageUrl)))
        const imgObjArray = imgFileArray.map((imgFile, i) => ({ data_url: post.img[i], file: imgFile}))
        setCreatePostForm({...createPostForm, ...post, img: imgObjArray, isOpenForm: true})
    }

    
    if (deletePostLoading) {
        return (
            <StyledMenu
                id="basic-menu" 
                anchorEl={anchorEl} 
                open={open} 
                onClose={() => setAnchorEl(null)}
            >
                <StyledMenuItem type="button"><CircularProgress /></StyledMenuItem>
            </StyledMenu>
        )           
    }

    return (
        <StyledMenu
            id="basic-menu" 
            anchorEl={anchorEl} 
            open={open} 
            onClose={() => setAnchorEl(null)}
        >
            <StyledMenuItem type="button" onClick={setEditPostForm}><AiFillEdit style={{ marginRight: "0.2rem" }} /> Edit</StyledMenuItem>
            <StyledMenuItem
                type="button" 
                onClick={() =>  deletePost({
                    variables: { id },
                    update: (cache, {data: { deletePost }}) => {
                        const allPosts = cache.readQuery({ query: GET_POSTS })
                        const user = cache.readQuery({ query: GET_USER, variables: { username: data?.getCurrentUser?.username } })
                        
                        const updateAllPosts = allPosts?.getPosts.filter(post => post?.id !== deletePost.id)
                        cache.writeQuery({ query: GET_POSTS, data: { getPosts: updateAllPosts } })
                        if (user) {
                            const updateUser = {...user?.getUser, posts: user?.getUser?.posts.filter(post => post?.id !== deletePost.id)}
                            cache.writeQuery({ query: GET_USER, variables: { username: data?.getCurrentUser?.username }, data: { getUser: updateUser } })
                        }
                    }
                })} 
            >
                <AiFillDelete style={{ marginRight: "0.2rem" }} /> 
                Delete
            </StyledMenuItem>
        </StyledMenu>
    )
}
