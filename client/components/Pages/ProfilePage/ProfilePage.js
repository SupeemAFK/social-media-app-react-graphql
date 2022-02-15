import React, { useState, useContext } from 'react'
import { CreatePostFormContext } from '../../../pages/_app'
import { useRouter } from 'next/router'

//auth
import { useSessionUser } from '../../../auth/getSessionUser'

//styles and icons
import { 
    ProfilePageContainer, 
    Container, 
    UserBanner, 
    UserDetails, 
    UserImageContainer,
    UserImageWrapper, 
    UsernameContainer, 
    Username, 
    Userbio, 
    UserProfileContainer, 
    UserPosts, 
    BackgroundImage,
    EditProfileBtnContainer,
    EditProfileBtn,
    Loading
} from './ProfilePage.styles'
import { FaUserEdit } from 'react-icons/fa'
import { CircularProgress } from '@mui/material'
import { Image } from '../../../styles/GlobalStyles'

//graphql
import { useQuery } from '@apollo/client'
import { GET_USER } from '../../../lib/Queries'

//components
import Post from '../../Posts/Post/Post'
import Form from '../../Form/Form'
import EditProfileForm from './EditProfileForm/EditProfileForm'

export default function ProfilePage() {
    const router = useRouter()
    const { username } = router.query
    const { data: getUserData, loading: getUserLoading } = useQuery(GET_USER, { variables: { username }})
    const user = getUserData?.getUser
    const { data: getCurrentUserData, loading: getCurrentUserLoading } = useSessionUser()

    const { createPostForm } = useContext(CreatePostFormContext)
    const [isOpenEditProfileForm, setIsOpenEditProfileForm] = useState(false)

    if (getUserLoading) {
        return (
            <Loading>
                    <CircularProgress />
            </Loading>
        )
    }

    return (
        <>
        {isOpenEditProfileForm && <EditProfileForm setIsOpenEditProfileForm={setIsOpenEditProfileForm} user={user} />}
        {createPostForm.isOpenForm && <Form />}
        <ProfilePageContainer>
            <Container>
                {/*user profile*/}
                <UserProfileContainer>
                    <UserBanner>
                        <BackgroundImage src={user?.banner} alt={user?.name} />
                    </UserBanner>

                    <UserImageContainer>
                        <UserImageWrapper>
                            <Image src={user?.imageUrl} alt={user?.name} />
                        </UserImageWrapper>
                    </UserImageContainer>

                    <UserDetails>
                        <UsernameContainer>
                            <Username>{user?.name}</Username>
                            <Userbio>{user?.bio}</Userbio>
                        </UsernameContainer>

                        {getCurrentUserData?.getCurrentUser?.id === user?.id && (
                            <EditProfileBtnContainer>
                                <EditProfileBtn onClick={() => setIsOpenEditProfileForm(true)}><FaUserEdit style={{ marginRight: "0.2rem" }} /> Edit profile</EditProfileBtn>
                            </EditProfileBtnContainer>
                        )}
                    </UserDetails>
                </UserProfileContainer>

                {/*user posts*/}
                <UserPosts>
                    {user?.posts?.map(post => <Post key={post.id} post={post} />)}
                </UserPosts>
            </Container>
        </ProfilePageContainer>
        </>
    )
}
