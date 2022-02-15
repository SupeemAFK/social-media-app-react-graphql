import React, { useContext }  from 'react'
import { CreatePostFormContext } from '../../pages/_app'
//auth
import { useSessionUser } from '../../auth/getSessionUser'

//styles and icons
import { IoCreate } from 'react-icons/io5'
import { FaSave } from 'react-icons/fa'
import { InputAdornment, LinearProgress, ImageList, ImageListItem } from '@mui/material';
import { Overlay, FormContainer, FormWrapper, FormCard, InputContainer, ImgWrapper, RemoveImgBtn, CreatePostBtn, BtnContainer, UserProfileWrapper, FormHeader, LinearProgressContainer } from './Form.styles';
import { StyledTextField, Image } from '../../styles/GlobalStyles';

//graphql
import { useMutation } from '@apollo/client'
import { CREATE_POST, EDIT_POST } from '../../lib/Mutations'
import { GET_POSTS, GET_USER } from '../../lib/Queries'; 

//components
import ImageUpload from './ImageUpload/ImageUpload'

export default function Form() {
    const { createPostForm, setCreatePostForm } = useContext(CreatePostFormContext)
    const { data } = useSessionUser()
    const currentUser = data?.getCurrentUser

    const [addPost, { loading: createPostLoading }] = useMutation(CREATE_POST, {
        onCompleted: () => {
            setCreatePostForm({ message: '', img: [], isOpenForm: false})
        },
        onError: (addPostError) => {
            console.error(addPostError);
        }
    })
    const [editPost, { loading: editPostLoading }] = useMutation(EDIT_POST, {
        onCompleted: () => {
            setCreatePostForm({ message: '', img: [], isOpenForm: false})
        },
        onError: (editPostError) => {
            console.error(editPostError)
        }
    })

    const isLoading = createPostLoading || editPostLoading
    const isCanSubmit = createPostForm.message !== '' || createPostForm.img.length !== 0

    function handleOnchange(e) {
        const name = e.target.name
        const value = e.target.value

        setCreatePostForm({...createPostForm, [name]: value })
    }

    async function handleOnImageUpload(imageList, addUpdateIndex) {
        setCreatePostForm({...createPostForm, img: [...createPostForm.img, ...imageList]})
    }

    function handleOnsubmit(e) {
        e.preventDefault()
        const imgFileArray = createPostForm.img.map(img => img.file)

        if (createPostForm.id) {
            editPost({variables: {img: imgFileArray, message: createPostForm.message, id: createPostForm.id}})
            return
        }

        addPost({
            variables: {img: imgFileArray, message: createPostForm.message},
            update: (cache, { data: { addPost } }) => {
                const allPosts = cache.readQuery({ query: GET_POSTS })
                const user = cache.readQuery({ query: GET_USER, variables: { username: currentUser?.username }})
                
                const updateAllPosts = [addPost, ...allPosts.getPosts]
                cache.writeQuery({ query: GET_POSTS, data: { getPosts: updateAllPosts } })
                if (user) {
                    const updateUser = {...user?.getUser, posts: [addPost, ...user?.getUser?.posts]}
                    cache.writeQuery({ query: GET_USER, variables: { username: currentUser?.username }, data: { getUser: updateUser } })
                }
            }
        })
    }

    function removeImg(index) {
        const newImg = createPostForm.img.filter((img, i) => i !== index)
        setCreatePostForm({ ...createPostForm, img: newImg })
    }

    return (
        <div>
            <Overlay onClick={() => setCreatePostForm({ message: '', img: [], isOpenForm: false})}></Overlay>
            <FormContainer>
                <FormCard onSubmit={handleOnsubmit}>
                    <FormHeader>
                        {isLoading && (
                            <LinearProgressContainer>
                                <LinearProgress color="primary" />
                            </LinearProgressContainer>
                        )}
                    </FormHeader>
                    <FormWrapper>
                        <InputContainer>
                            <UserProfileWrapper>
                                <Image src={currentUser?.imageUrl} alt={currentUser?.name} />
                            </UserProfileWrapper>
                            <StyledTextField 
                                onChange={handleOnchange} 
                                width="90%"
                                name="message" 
                                value={createPostForm.message} 
                                autoComplete="off" 
                                variant = "standard"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <ImageUpload handleOnImageUpload={handleOnImageUpload} />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </InputContainer>
                        {createPostForm.img.length !== 0 && (
                            <ImageList>
                                {createPostForm.img.map((img, index) => (
                                    <ImageListItem key={index}>
                                        <ImgWrapper>
                                            <RemoveImgBtn type="button" onClick={() => removeImg(index)}>X</RemoveImgBtn>
                                            <Image src={img.data_url} alt={img.file.name} />
                                        </ImgWrapper>
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        )}
                        <BtnContainer>
                            {isCanSubmit ? (
                                <CreatePostBtn type="submit">{createPostForm?.id ? <>Save <FaSave /></> : <>Create <IoCreate /></>}</CreatePostBtn>
                            ) : (
                                <CreatePostBtn disabled type="button">Create <IoCreate /></CreatePostBtn>
                            )}
                        </BtnContainer>
                    </FormWrapper>
                </FormCard>
            </FormContainer> 
        </div>        
    )
}
