import React, { useState, useEffect } from 'react'
import ImageUploading from 'react-images-uploading';
import { urlToFile } from '../../utils/imgPathToFile'

//styles and icons
import {
    UpdateProfileContainer,
    HeaderText,
    PrevBtn,
    NextBtn,
    Container,
    UpdateProfileForm,
    Header,
    Logo,
    BtnContainer,
    ImageWrapper,
    AddImageBtn,
    ProfileImage,
    DoneBtn
} from './UpdateProfile.styles'
import { StyledTextField, Image } from '../../GlobalStyles'
import { IoIosCloudDone } from 'react-icons/io'
import { MdKeyboardBackspace, MdChevronRight } from 'react-icons/md'
import { RiImageAddLine } from 'react-icons/ri'

//graphql
import { useQuery, useMutation } from '@apollo/client'
import { GET_CURRENT_USER } from '../../graphql/Queries'
import { UPDATE_USER_PROFILE } from '../../graphql/Mutations'

//components
import ProfilePicEditor from '../../components/ProfilePicEditor/ProfilePicEditor';

export default function UpdateProfile() {
    const { data } = useQuery(GET_CURRENT_USER)
    const currentUser = data?.getCurrentUser
    const [updateProfile] = useMutation(UPDATE_USER_PROFILE, {
        onCompleted: () => {
            window.location.href = '/'
        }
    })

    const [updateProfileForm, setUpdateProfileForm] = useState({ imageUrl: "", name: "", bio: "" })
    const [currentUpdate, setCurrentUpdate] = useState("profilePic")
    const [openProfilePicEditor, setOpenProfilePicEditor] = useState(null)

    useEffect(() => {
        const setProfileForm = async () => {
            setUpdateProfileForm({...updateProfileForm, ...currentUser, imageUrl: { data_url: currentUser?.imageUrl, file: "" }, banner: { data_url: currentUser?.banner, file: "" }})
            const imageFile = currentUser?.imageUrl ? await urlToFile(currentUser?.imageUrl) : ""
            const bannerFile = currentUser?.banner ? await urlToFile(currentUser?.banner) : ""
            setUpdateProfileForm({...updateProfileForm, ...currentUser, imageUrl: { data_url: currentUser?.imageUrl, file: imageFile }, banner: { data_url: currentUser?.banner, file: bannerFile }})
        }
        setProfileForm()
    }, [data])

    console.log(updateProfileForm)

    function handleOnSubmit(e) {
        e.preventDefault()

        updateProfile({
            variables: {
                imageUrl: updateProfileForm.imageUrl.file,
                banner: updateProfileForm.banner.file,
                name: updateProfileForm.name,
                bio: updateProfileForm.bio,
                id: updateProfileForm.id,
            }
        })
    }

    function handleOnChange(e) {
        const name = e.target.name
        const value = e.target.value
        setUpdateProfileForm({ ...updateProfileForm, [name]: value })
    }

    function handleOnImageUpload(imageList, addUpdateIndex) {
        setOpenProfilePicEditor({ imageUrl: imageList[0] })
    }

    function handleOnCrop(croppedImage) {
        setUpdateProfileForm({...updateProfileForm, imageUrl: croppedImage})
    }

    return (
        <>
        {openProfilePicEditor && <ProfilePicEditor handleOnCrop={handleOnCrop} image={openProfilePicEditor?.imageUrl} setOpenProfilePicEditor={setOpenProfilePicEditor} />}
        <UpdateProfileContainer>
            <HeaderText>Almost done <IoIosCloudDone style={{ marginLeft: "0.5rem" }} /></HeaderText>
            <UpdateProfileForm onSubmit={handleOnSubmit}>
                <Header>
                    <Logo><Image src="https://pbs.twimg.com/profile_images/1143711808118755328/Rf0Wt4GQ.jpg" alt="logo" /></Logo> 
                    Change your profile
                </Header>
                <Container>
                    {currentUpdate === "profilePic" && (
                        <ImageWrapper>
                            <ImageUploading onChange={handleOnImageUpload} dataURLKey="data_url">
                                {({ onImageUpload }) => (
                                    <AddImageBtn onClick={onImageUpload} type="button"><RiImageAddLine /></AddImageBtn>
                                )}
                            </ImageUploading>
                            <ProfileImage src={updateProfileForm?.imageUrl?.data_url} alt={currentUser?.name} />
                        </ImageWrapper>
                    )}
                    {currentUpdate === "name" && (
                        <div>
                            <StyledTextField value={updateProfileForm?.name} onChange={handleOnChange} style={{ marginBottom: "1rem" }} name="name" label="Name" variant="standard" />
                        </div>
                    )}
                    {currentUpdate === "bio" && (
                        <div>
                            <StyledTextField value={updateProfileForm?.bio} onChange={handleOnChange} style={{ marginBottom: "1rem" }} name="bio" label="Write some descriptions(bio)" variant="standard" />
                        </div>
                    )}
                    <BtnContainer>
                        {currentUpdate === "profilePic" && <NextBtn type="button" onClick={() => setCurrentUpdate("name")}>Next <MdChevronRight /></NextBtn>}
                        {currentUpdate === "name" && <PrevBtn type="button" onClick={() => setCurrentUpdate("profilePic")}><MdKeyboardBackspace /></PrevBtn>}
                        {currentUpdate === "name" && <NextBtn type="button" onClick={() => setCurrentUpdate("bio")}>Next <MdChevronRight /></NextBtn>}
                        {currentUpdate === "bio" && <PrevBtn type="button" onClick={() => setCurrentUpdate("name")}><MdKeyboardBackspace /></PrevBtn>}
                        {currentUpdate === "bio" && <DoneBtn type="submit">Done</DoneBtn>}
                    </BtnContainer>
                </Container>
            </UpdateProfileForm>
        </UpdateProfileContainer>
        </>
    )
}
