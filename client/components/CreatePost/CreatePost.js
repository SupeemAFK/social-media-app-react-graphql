import React, { useContext } from 'react'
import { CreatePostFormContext } from '../../pages/_app'

//styles and icons
import { Container, CreatePostContainer, LoginToCreatePostBtn, UserProfileWrapper } from './CreatePost.styles'
import { Image, StyledTextField, StyledLink } from '../../styles/GlobalStyles'
import { FcLock } from 'react-icons/fc'

//graphql
import { useQuery } from '@apollo/client'
import { GET_CURRENT_USER } from '../../lib/Queries'

export default function CreatePost() {
    const { createPostForm, setCreatePostForm } = useContext(CreatePostFormContext)
    const { data, loading, error } = useQuery(GET_CURRENT_USER)
    const currentUser = data?.getCurrentUser

    return (
        <Container>
            {currentUser ? (
                <CreatePostContainer>
                    <StyledLink href={`/user/${currentUser?.username}`}>
                        <UserProfileWrapper>
                            <Image src={currentUser?.imageUrl} alt={currentUser?.name} />
                        </UserProfileWrapper>
                    </StyledLink>
                    <StyledTextField onClick={() => setCreatePostForm({...createPostForm, isOpenForm: true})} width="90%" size="small" label={`What's in your mind ${currentUser?.name}`} inputProps={{ readOnly: true }} />
                </CreatePostContainer>
            ) : (
                <StyledLink href='/auth'>
                    <LoginToCreatePostBtn><FcLock style={{ marginRight: "0.5rem" }} />Login</LoginToCreatePostBtn>
                </StyledLink>
            )}
        </Container>
    )
}
