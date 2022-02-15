import React, { useEffect, useState, useContext } from 'react'
import { CreatePostFormContext } from '../../../pages/_app'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import FastAverageColor from 'fast-average-color';

//auth
import { useSessionUser } from '../../../auth/getSessionUser';

//styles and icons
import { CircularProgress } from '@mui/material'
import { PostDetailContainer, ImgWrapper, ImgContainer, PostDetailWrapper, EmotionBtnWrappper, EmotionBtnContainer, EmotionBtn, CloseBtn, DotBtn } from './ShowPhoto.styles'
import { AiOutlineLike, AiFillLike } from 'react-icons/ai'
import { IoIosShareAlt } from 'react-icons/io'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { FiDownload } from 'react-icons/fi'
import { StyledMenu, StyledMenuItem, Image } from '../../../styles/GlobalStyles'

//graphql
import { useQuery, useMutation } from '@apollo/client'
import { LIKE_POST } from '../../../lib/Mutations'
import { GET_POSTS } from '../../../lib/Queries'

//components
import Post from '../../Posts/Post/Post'
import Form from '../../Form/Form'

export default function ShowPhoto() {
    const router = useRouter()
    const { createPostForm } = useContext(CreatePostFormContext)
    const [colorRGBA, setColorRGBA] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    //get post
    const { id, photoIndex } = router.query
    const { data: postsData, loading } = useQuery(GET_POSTS)
    const post = postsData?.getPosts.find(post => post.id === id)

    //get currentuser
    const { data: currentUserData } = useSessionUser()
    const currentUser = currentUserData?.getCurrentUser

    const [likePost] = useMutation(LIKE_POST, {
        onError: (likePostError) => {
            console.error(likePostError)
        }
    })

    useEffect(() => {
        post?.img ? getAverageColor(post?.img[photoIndex]).then(color => setColorRGBA(color?.rgba)) : setColorRGBA(null)
    }, [post])

    return (
        <>
            {createPostForm.isOpenForm && <Form />}
            <PostDetailContainer>
                    <ImgContainer onClick={e => e.target.id === "parent" && router.back()} bgcolor={colorRGBA} id="parent">
                        {loading ? <CircularProgress /> : (
                            <>
                            <CloseBtn onClick={() => router.back()}>X</CloseBtn>
                            <DotBtn onClick={(e) => setAnchorEl(e.currentTarget)}><BiDotsVerticalRounded /></DotBtn>
                            <StyledMenu 
                              id="basic-menu" 
                              anchorEl={anchorEl} 
                              open={open} 
                              onClose={() => setAnchorEl(null)}
                            >
                                <a 
                                  style={{ textDecoration: "none", color: "inherit" }} 
                                  href={`https://storage.googleapis.com/download/storage/v1/b/${post?.img[photoIndex]?.split('/')[3]}/o/${post?.img[photoIndex]?.split('/')[4]}?alt=media`} 
                                  download
                                  onClick={() => toast.success("Image downloaded", {
                                        position: "bottom-center",
                                        autoClose: 5000,
                                        closeOnClick: true,
                                        pauseOnHover: false,
                                    })}
                                >
                                    <StyledMenuItem><FiDownload style={{ marginRight: "0.25rem" }} />Download</StyledMenuItem>
                                </a>
                            </StyledMenu>
                            <ImgWrapper>
                                <Image src={post?.img[photoIndex]} alt={post?.message} />
                            </ImgWrapper>
                            <EmotionBtnContainer>
                                <EmotionBtnWrappper bgcolor={colorRGBA}>
                                    <EmotionBtn onClick={() => likePost({variables: {id: post.id}})}>
                                        {post?.likes.some(user => user.id === currentUser?.id) ? <AiFillLike style={{ color: "#3b82f6", marginRight: "0.1rem" }} /> : <AiOutlineLike />}
                                        {post?.likes.length !== 0 && post?.likes.length}
                                    </EmotionBtn>
                                    <EmotionBtn><IoIosShareAlt /></EmotionBtn>
                                </EmotionBtnWrappper>
                            </EmotionBtnContainer>
                            </>
                        )}
                    </ImgContainer>
                <PostDetailWrapper>
                    {loading ? <CircularProgress /> : <Post post={post} inPostDetail={true} />}
                </PostDetailWrapper>
            </PostDetailContainer>
        </>
    )
}

//get average color
function getAverageColor(imageURL) {
    const fac = new FastAverageColor();

    const bucketName = imageURL?.split('/')[3]
    const fileName = imageURL?.split('/')[4]

    const color = fac.getColorAsync(`https://storage.googleapis.com/storage/v1/b/${bucketName}/o/${fileName}?alt=media`, {
        ignoredColor: [255, 255, 255, 255] // white
    })
    .then(color => color)
    .catch(e => {
        console.log(e);
    });

    return color
}