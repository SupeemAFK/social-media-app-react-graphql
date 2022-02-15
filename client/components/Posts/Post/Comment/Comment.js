import React, { useState } from 'react'

//styles and icons
import { CommentContainer, CommentDetail, ProfileContainer, ProfileWrapper, CommentMessageContainer, CommentMessageWrapper, CommentMessage, CommentImgWrapper, Name, CommentOption, CommentBtn } from './Comment.styles'
import { BsThreeDots } from 'react-icons/bs'
import { Image, StyledLink } from '../../../../styles/GlobalStyles'

//components
import Menu from './Menu/Menu'

export default function Comment({ currentUser, comment, commentForm, setCommentForm, id }) {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    return (
        <CommentContainer>
            <CommentDetail>
                <ProfileContainer>
                    <StyledLink href={`/user/${comment?.creator?.username}`}>
                        <ProfileWrapper>
                            <Image src={comment?.creator?.imageUrl} alt={comment?.creator?.name} />
                        </ProfileWrapper>
                    </StyledLink>
                </ProfileContainer>

                <CommentMessageContainer>
                    <CommentMessageWrapper>
                        <CommentMessage>
                            <Name>{comment?.creator?.name}</Name>
                            <span>{comment?.commentMessage}</span>
                        </CommentMessage>
                        {comment.commentImg && (
                            <CommentImgWrapper>
                                <Image src={comment?.commentImg} alt={comment?.commentMessage} />
                            </CommentImgWrapper>
                        )}
                    </CommentMessageWrapper>
                </CommentMessageContainer>
            </CommentDetail>
            
            <CommentOption>
                {currentUser?.id === comment?.creator?.id && <CommentBtn type="button" onClick={(e) => setAnchorEl(e.currentTarget)}><BsThreeDots /></CommentBtn>}
                <Menu comment={comment} commentForm={commentForm} setCommentForm={setCommentForm} id={id} anchorEl={anchorEl} setAnchorEl={setAnchorEl} open={open} />
            </CommentOption>
        </CommentContainer>
    )
}
