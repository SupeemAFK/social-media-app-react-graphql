import React, { useState } from 'react'
import moment from 'moment'

//styles and icons
import { HeaderContainer, TopHeader, Creator, ProfileWrapper, ProfileDetails, DotBtn, SeeMore, CreatedAt } from './Header.styles'
import { BsThreeDots } from 'react-icons/bs'
import { Image, StyledLink } from '../../../../styles/GlobalStyles'

//graphql
import { useQuery } from '@apollo/client'
import { GET_CURRENT_USER } from '../../../../lib/Queries'

//components
import Menu from './Menu/Menu'

export default function Header({ post }) {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)    
    const [isSeeMore, setIsSeeMore] = useState(false)
    const createdAt = moment(Number(post?.createdAt)).format()
    const { data, loading, error } = useQuery(GET_CURRENT_USER)
    const currentUser = data?.getCurrentUser

    return (
        <HeaderContainer>
            <TopHeader>
                <Creator>
                    <StyledLink href={`/user/${post?.creator?.username}`}>
                        <ProfileWrapper>
                            <Image src={post?.creator?.imageUrl} alt="profile" />
                        </ProfileWrapper>
                    </StyledLink>
                    <div>
                        <ProfileDetails>
                            {post?.creator?.name}
                            <CreatedAt>{moment(createdAt).fromNow()}</CreatedAt>
                        </ProfileDetails>
                    </div>
                </Creator>
                {post?.creator?.id === currentUser?.id && (
                    <DotBtn type="button" onClick={(e) => setAnchorEl(e.currentTarget)}><BsThreeDots /></DotBtn>
                )}
                <Menu post={post} id={post?.id} anchorEl={anchorEl} setAnchorEl={setAnchorEl} open={open} />
            </TopHeader>
            {post?.message?.length > 200 ? (
                <div>
                    {isSeeMore ? (
                        <p>{post?.message}<SeeMore onClick={() => setIsSeeMore(false)}> See less...</SeeMore></p>
                    ) : (
                        <p>{post?.message.substring(0, 200)}<SeeMore onClick={() => setIsSeeMore(true)}> See more...</SeeMore></p>
                    )}
                </div>
            ) : (
                <div>
                    <p>{post?.message}</p>
                </div>
            )}
        </HeaderContainer>
    )
}
