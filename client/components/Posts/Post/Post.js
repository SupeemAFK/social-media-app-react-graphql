import React, { useState } from 'react'
import useUploadImg from '../../../hooks/useUploadImg'

//styles and icons
import { AiOutlineLike, AiFillLike } from 'react-icons/ai'
import { FaSave } from 'react-icons/fa'
import { ImCancelCircle } from 'react-icons/im'
import { IoRemoveCircleSharp } from 'react-icons/io5'
import { IoIosShareAlt } from 'react-icons/io'
import { BiComment, BiSend } from 'react-icons//bi'
import { InputAdornment, ImageList, ImageListItem, CircularProgress } from '@mui/material'
import { StyledLink, Image, StyledTextField } from '../../../styles/GlobalStyles'
import { PostContainer, ImgWrapper, EmojiBtnContainer, EmojiBtn, CommentSection, InputContainer, SendBtn, CommentImgWrapper, CommentImgContainer, RemoveImgBtn } from './Post.styles'

//graphql
import { useQuery, useLazyQuery, useMutation } from '@apollo/client'
import { GET_CURRENT_USER, GET_COMMENTS } from '../../../lib/Queries'
import { LIKE_POST, ADD_COMMENT, EDIT_COMMENT } from '../../../lib/Mutations'

//components
import Header from './Header/Header'
import Comment from './Comment/Comment'
import ImageUpload from '../../Form/ImageUpload/ImageUpload'

export default function Post({ post, inPostDetail }) {
    const { uploadImg, isUploading } = useUploadImg()
    const { data } = useQuery(GET_CURRENT_USER)
    const currentUser = data?.getCurrentUser
    const [getComments, { data: commentsData, loading: getCommentsLoading }] = useLazyQuery(GET_COMMENTS, { variables: { id: post?.id } })
    const [likePost, { loading: likePostLoading }] = useMutation(LIKE_POST, {
        onError: (likePostError) => {
            console.error(likePostError)
        }
    })
    const [addComment, { loading: addCommentLoading }] = useMutation(ADD_COMMENT, {
        onError: (addCommentError) => {
            console.error(addCommentError)
        }
    })
    const [editComment, { loading: editCommentLoading }] = useMutation(EDIT_COMMENT, {
        onError: (editCommentError) => {
            console.error(editCommentError)
        }
    })
    const [commentForm, setCommentForm] = useState({ commentMessage:'', commentImg: '' })
    const [isOpenCommentSection, setIsOpenCommentSection] = useState(false)

    const isCanSubmit = commentForm.commentMessage !== '' || commentForm.commentImg !== ''
    const openCommentSection = isOpenCommentSection || inPostDetail

    async function handleCommentSubmit(e) {
        e.preventDefault()
        let commentImgUrl = ""
        if (commentForm.commentImg.file) commentImgUrl = await uploadImg(commentForm.commentImg.file)

        if (commentForm.id) {
            editComment({variables: {commentImg: commentImgUrl, commentMessage: commentForm.commentMessage, id: post.id, commentId: commentForm.id}})
            setCommentForm({ commentMessage:'', commentImg: '' })
            return
        }

        addComment({variables: {commentImg: commentImgUrl, commentMessage: commentForm.commentMessage, id: post.id}})
        setCommentForm({ commentMessage:'', commentImg: '' })
    }

    function handleOnCommentChange(e) {
        const name = e.target.name
        const value = e.target.value
        setCommentForm({...commentForm, [name]: value})   
    }

    function handleOnImageUpload(imageList, addUpdateIndex) {
        setCommentForm({...commentForm, commentImg: imageList[0] })
    }

    function switchCommentSectionState() {
        getComments()
        setIsOpenCommentSection(!isOpenCommentSection)
        setCommentForm({ commentMessage:'', commentImg: '' })
    }

    return (
        <PostContainer inPostDetail={inPostDetail}>
            <Header post={post} />
            
            {post?.img?.length !== 0 && !inPostDetail && (
                <ImageList 
                    cols={post?.img?.length > 1 ? 2 : post?.img?.length} 
                    rows={post?.img?.length > 2 ? 2 : 1}
                >
                    {post?.img?.map((imageUrl, index) => (
                        <ImageListItem key={index}>
                            <StyledLink href={`/user/${post?.creator?.username}/status/${post?.id}/photo/${index}`}>
                                <ImgWrapper>
                                    <Image src={imageUrl} alt={post?.message} />
                                </ImgWrapper>
                            </StyledLink>
                        </ImageListItem>
                    ))}
                </ImageList>
            )}

            <EmojiBtnContainer>
                {currentUser ? (
                    <>
                        <EmojiBtn onClick={() => likePost({variables: { id: post?.id }})}>
                            {post?.likes?.some(likedUser => likedUser?.id === currentUser?.id) ? <AiFillLike style={{ marginRight: "0.1rem", color: "#3b82f6" }} /> : <AiOutlineLike style={{ marginRight: "0.1rem" }} />}
                            Like {post?.likes?.length !== 0 && post?.likes?.length}
                        </EmojiBtn>
                        {!inPostDetail && <EmojiBtn onClick={() => switchCommentSectionState()}><BiComment style={{ marginRight: "0.1rem" }} /> Comment</EmojiBtn>}
                    </>
                ) : (
                    <>
                        <EmojiBtn disabled><AiOutlineLike style={{ marginRight: "0.1rem" }} /> Like {post?.likes?.length !== 0 && post?.likes?.length}</EmojiBtn>
                        {!inPostDetail && <EmojiBtn onClick={() => switchCommentSectionState()}><BiComment style={{ marginRight: "0.1rem" }} /> Comment</EmojiBtn>}
                    </>
                )}
                <EmojiBtn ><IoIosShareAlt style={{ marginRight: "0.1rem" }} /> Share</EmojiBtn>
            </EmojiBtnContainer>

            {openCommentSection && (
                <CommentSection onSubmit={handleCommentSubmit}>
                    <InputContainer>
                        <StyledTextField
                            label="Comment"
                            disabled={currentUser ? false : true}
                            onChange={handleOnCommentChange} 
                            name="commentMessage" 
                            value={commentForm.commentMessage} 
                            autoComplete="off"
                            variant="standard"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {currentUser && <ImageUpload handleOnImageUpload={handleOnImageUpload} />}
                                    </InputAdornment>
                                ),
                            }} 
                        />
                        {currentUser ? (
                            <SendBtn type={isCanSubmit ? "submit" : "button"} disabled={!isCanSubmit}>{commentForm.id ? <FaSave /> : <BiSend />}</SendBtn>
                        ): (
                            <SendBtn type="button" disabled><BiSend /></SendBtn>
                        )}
                        {commentForm.id && <SendBtn onClick={() => setCommentForm({ commentMessage:'', commentImg: ''})}><ImCancelCircle /></SendBtn>}
                    </InputContainer>
                    <CommentImgContainer>
                        {commentForm.commentImg !== "" && (
                            <CommentImgWrapper>
                                <RemoveImgBtn type="button" onClick={() => setCommentForm({...commentForm, commentImg: ''})}><IoRemoveCircleSharp /></RemoveImgBtn>
                                <Image src={commentForm.commentImg.data_url} alt={commentForm.commentMessage} />
                            </CommentImgWrapper>
                        )}
                    </CommentImgContainer>
                    {getCommentsLoading ? 
                        <CircularProgress color="primary" /> : 
                        commentsData?.getPost?.comments.map(comment => <Comment key={comment.id} currentUser={currentUser} comment={comment} commentForm={commentForm} setCommentForm={setCommentForm} id={post?.id} />
                    )} 
                </CommentSection>
            )}
        </PostContainer>

    )
}
