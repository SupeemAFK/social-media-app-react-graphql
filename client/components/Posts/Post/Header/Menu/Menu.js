import React, { useContext } from 'react'
import { CreatePostFormContext } from '../../../../../pages/_app'
import dataURLtoFile from '../../../../../utils/dataURLtoFile'

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

        if (!post.img) {
            setCreatePostForm({...createPostForm, ...post, isOpenForm: true})
            return
        }
        const imgName = post.img.map(imgUrl => getName(imgUrl))
        const imgBase64Array = await Promise.all(post.img.map((imageUrl) => toDataURL(imageUrl)))
        const imgFileArray = imgBase64Array.map((imgBase64, i) => dataURLtoFile(imgBase64, imgName[i]))
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

const toDataURL = url => fetch(url)
      .then(response => response.blob())
      .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
     }))

function getName(url) {
    const arr = url.split('/')
    return arr[8]
}