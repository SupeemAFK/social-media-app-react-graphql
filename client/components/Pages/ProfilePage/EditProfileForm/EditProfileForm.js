import React, { useState, useEffect } from 'react'
import useUploadImg from '../../../../hooks/useUploadImg'
import dataURLtoFile from '../../../../utils/dataURLtoFile'
import ImageUploading from 'react-images-uploading';
import { toast } from 'react-toastify'

//styles and icons
import { 
    Overlay,
    Image,
    BtnContainer,
    Btn,
    EditProfileFormContainer,
    Form,
    FormHeader,
    FormHeaderContainer,
    LinearProgressContainer,
    SaveBtn,
    UserProfile,
    UserBannerContainer,
    UserBanner,
    BackgroundImage,
    UserImageContainer,
    UserImageWrapper,
    TextFieldContainer
} from './EditProfileForm.styles'
import { RiImageAddLine } from 'react-icons/ri'
import { ImCancelCircle } from 'react-icons/im'
import { StyledTextField } from '../../../../styles/GlobalStyles'
import { LinearProgress } from '@mui/material'
 
//graphql
import { useMutation } from '@apollo/client'
import { UPDATE_USER_PROFILE } from '../../../../lib/Mutations'

//components
import ProfilePicEditor from '../../../ProfilePicEditor/ProfilePicEditor';
import BannerEditor from '../../../BannerEditor/BannerEditor';

export default function EditProfileForm({ user, setIsOpenEditProfileForm }) {
    const { uploadImg, isUploading } = useUploadImg()
    const [updateProfile, { loading: updateProfileLoading }] = useMutation(UPDATE_USER_PROFILE, {
        onError: (updateProfileError) => {
            console.error(updateProfileError)
            const error = updateProfileError.graphQLErrors[0]
            setAlert({ helperText: error.message, inputName: error.extensions.inputName })        
        },
        onCompleted: () => {
            toast.success("Profile has been updated!", {
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: false,
            })
        }
    })

    const [userProfileForm, setUserProfileForm] = useState({ name: "", imageUrl: "", banner: "", bio: "" })
    const [openProfilePicEditor, setOpenProfilePicEditor] = useState(null)
    const [openBannerEditor, setOpenBannerEditor] = useState(null)
    const [alert, setAlert] = useState({ helperText: null, inputName: [] })
    const isCanSave = userProfileForm.name !== user?.name || userProfileForm.imageUrl !== user?.imageUrl || userProfileForm.banner !== user?.banner || userProfileForm.bio !== user?.bio

    useEffect(async () => {
        setUserProfileForm({...userProfileForm, ...user, imageUrl: { data_url: user.imageUrl, file: "" }, banner: { data_url: user.banner, file: "" }})
        const imgBase64 = await toDataURL(user.imageUrl)
        const bannerBase64 = await toDataURL(user.banner) 
        const imgFile = dataURLtoFile(imgBase64, getName(user.imageUrl))
        const bannerFile = dataURLtoFile(bannerBase64, getName(user.banner))

        const imgObj = { data_url: user.imageUrl, file: imgFile }
        const bannerObj = { data_url: user.banner, file: bannerFile }

        setUserProfileForm({...userProfileForm, ...user, imageUrl: imgObj, banner: bannerObj})
    }, [])

    useEffect(() => {
        const timeout = setTimeout(() => {
            setAlert({ helperText: null, inputName: [] })
        }, 3000)
        return () => clearTimeout(timeout)
    }, [alert])

    async function handleOnSubmit(e) {
        e.preventDefault()
        let imgUrl = user.imageUrl
        let bannerUrl = user.banner

        if (userProfileForm.imageUrl.data_url != user.imageUrl) {
            imgUrl = await uploadImg(userProfileForm.imageUrl.file)
        }
        if (userProfileForm.banner.data_url != user.banner) {
            bannerUrl = await uploadImg(userProfileForm.banner.file)
        }

        updateProfile({
            variables: {
                name: userProfileForm.name,
                imageUrl: imgUrl,
                banner: bannerUrl,
                bio: userProfileForm.bio,
                id: userProfileForm.id,
            }
        })
    }

    function handleOnchange(e) {
        const name = e.target.name
        const value = e.target.value

        setUserProfileForm({...userProfileForm, [name]: value})
    }

    async function removeBanner() {
        const bannerUrl = "https://res.cloudinary.com/dkmwuwsvw/image/upload/v1656342994/img-files/depositphotos_137014128-stock-illustration-user-profile-icon_pqovr7.jpg"
        const bannerBase64 = await toDataURL(bannerUrl) 
        const bannerFile = dataURLtoFile(bannerBase64, "depositphotos_137014128-stock-illustration-user-profile-icon_pqovr7.jpg")

        const bannerObj = { data_url: bannerUrl, file: bannerFile }
        setUserProfileForm({...userProfileForm, banner: bannerObj})
    }

    //banner upload
    function handleOnBannerUpload(imageList, addUpdateIndex) {
        setOpenBannerEditor({ image: imageList[0] })
    }
    //banner crop
    function handleBannerCrop(croppedBanner) {
        setUserProfileForm({...userProfileForm, banner: croppedBanner})
    }

    //image upload
    function handleOnImageUpload(imageList, addUpdateIndex) {
        setOpenProfilePicEditor({ image: imageList[0] })
    }
    //image crop
    function handleImageCrop(croppedImage) {
        setUserProfileForm({...userProfileForm, imageUrl: croppedImage})
    }

    return (
        <>
        {openProfilePicEditor && <ProfilePicEditor handleOnCrop={handleImageCrop} image={openProfilePicEditor.image} setOpenProfilePicEditor={setOpenProfilePicEditor} />}
        {openBannerEditor && <BannerEditor handleOnCrop={handleBannerCrop} image={openBannerEditor.image} setOpenBannerEditor={setOpenBannerEditor} />}
        <Overlay onClick={() => setIsOpenEditProfileForm(false)}></Overlay>
        <EditProfileFormContainer>
            <Form onSubmit={handleOnSubmit}>
                <FormHeaderContainer>
                    {updateProfileLoading && (
                        <LinearProgressContainer>
                            <LinearProgress style={{ width: '100%'}} color="primary" />
                        </LinearProgressContainer>
                    )}
                    <FormHeader>Edit Profile 
                        <SaveBtn 
                            type={updateProfileLoading ? "button" : !isCanSave ? "button" : "submit"} 
                            disabled={updateProfileLoading ? true : !isCanSave}> Save      
                        </SaveBtn>
                    </FormHeader>
                </FormHeaderContainer>
                <UserProfile>
                    <UserBannerContainer>
                        <ImageUploading onChange={handleOnBannerUpload} dataURLKey="data_url">
                            {({ onImageUpload }) => (
                                <BtnContainer>
                                    <Btn type="button" onClick={onImageUpload}><RiImageAddLine /></Btn>
                                    <Btn type="button" onClick={removeBanner}><ImCancelCircle /></Btn>
                                </BtnContainer>
                            )}
                        </ImageUploading>
                        <UserBanner>
                            <BackgroundImage src={userProfileForm?.banner.data_url} alt={userProfileForm?.name} />
                        </UserBanner>
                    </UserBannerContainer>

                    <UserImageContainer>
                        <UserImageWrapper>
                            <ImageUploading onChange={handleOnImageUpload} dataURLKey="data_url">
                                {({ onImageUpload }) => (
                                    <BtnContainer>
                                        <Btn onClick={onImageUpload} type="button"><RiImageAddLine /></Btn>
                                    </BtnContainer>
                                )}
                            </ImageUploading>
                            <Image src={userProfileForm?.imageUrl.data_url} alt={userProfileForm?.name} />
                        </UserImageWrapper>
                    </UserImageContainer>

                    <TextFieldContainer>
                        <StyledTextField
                            onChange={handleOnchange}
                            value={userProfileForm?.name}
                            error={alert.inputName.includes("name")} 
                            helperText={alert.inputName.includes("name") && alert.helperText} 
                            name="name" 
                            label="Name"
                            style={{ margin: "0.5rem 0" }}
                            variant="standard" 
                        />
                        <StyledTextField 
                            onChange={handleOnchange}
                            value={userProfileForm?.bio}
                            name="bio"  
                            label="Bio"
                            style={{ margin: "0.5rem 0" }}
                            variant="standard" 
                        />
                    </TextFieldContainer>
                </UserProfile>
            </Form>
        </EditProfileFormContainer>
        </>
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