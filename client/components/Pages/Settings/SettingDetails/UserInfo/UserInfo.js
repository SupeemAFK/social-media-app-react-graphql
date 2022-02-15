import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { useAuth } from '../../../../../auth/AuthProvider'

//auth
import { useSessionUser } from '../../../../../auth/getSessionUser'

//styles and icons
import { EyeButton } from '../../../Auth/Input/Input.styles'
import { InputAdornment } from '@mui/material'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import  { HiOutlineArrowNarrowLeft } from 'react-icons/hi'
import { StyledLink, StyledTextField } from '../../../../../styles/GlobalStyles'
import { GobackBtn } from '../../Settings.styles'
import { HeaderText } from '../../Settings.styles'
import { DoneBtn, BtnContainer, ChangeFieldBtn, VerifyContainer, VerifyBtn } from './UserInfo.styles'

//graphql
import { GET_CURRENT_USER } from '../../../../../lib/Queries';

export default function UserInfo() {
    const { changeEmail, changeUsername, sendVerifyEmail } = useAuth()
    const { data, client } = useSessionUser()
    const currentUser = data?.getCurrentUser

    const [enableEmailField, setEnableEmailField] = useState(false)
    const [enableUsernameField, setEnableUsernameField] = useState(false)
    const [alert, setAlert] = useState({ helperText: null, inputName: [] })
    const [userInfoForm, setUserInfoForm] = useState({ email: "", username: "", password: ""})
    const [isShowPassword, setIsShowPassword] = useState(false)
    const isCanSubmit = userInfoForm.email !== currentUser?.email || userInfoForm.username !== currentUser?.username

    useEffect(() => {
        setUserInfoForm({...userInfoForm, ...currentUser})
    }, [data])

    useEffect(() => {
        const timeout = setTimeout(() => {
            setAlert({ helperText: null, inputName: [] })
        }, 3000)

        return () => clearTimeout(timeout)
    }, [alert])

    async function handleOnSubmit(e) {
        e.preventDefault()

        if (userInfoForm.password === '') {
            return setAlert({ helperText: "Please enter your password before change anything", inputName: ["password"] })
        }

        if (enableEmailField) {
            const { error } = await changeEmail(userInfoForm.email, userInfoForm.password)
            if (error) {
                if (error.message === "Invalid password") {
                    return setAlert({ helperText: error.message, inputName: ['password'] })
                }
                if (error.message === "Email already used") {
                    return setAlert({ helperText: error.message, inputName: ['email'] })
                }
            }
            toast.success("Email has been updated!", {
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: false,
            })
        }

        if (enableUsernameField) {
            const { error } = await changeUsername(userInfoForm.username, userInfoForm.password)
            if (error) {
                if (error.message === "Invalid password") {
                    return setAlert({ helperText: error.message, inputName: ['password'] })
                }
                if (error.message === "Username already used") {
                    return setAlert({ helperText: error.message, inputName: ['email'] })
                }
            }
            toast.success("Username has been updated!", {
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: false,
            })
        }
        setUserInfoForm({ ...userInfoForm, password: '' })
        return client.refetchQueries({ include: [GET_CURRENT_USER] })
    }

    async function sendVerifyEmailCurrentUser(email) {
        const { data } = await sendVerifyEmail(email)
        if (data.message === "Success") return toast.success("Email has been sent!", {
            autoClose: 5000,
            closeOnClick: true,
            pauseOnHover: false,
        }) 
    }

    function handleOnChange(e) {
        const name = e.target.name
        const value = e.target.value

        setUserInfoForm({...userInfoForm, [name]: value})
    }

    return (
        <div>
            <form onSubmit={handleOnSubmit}>
                <HeaderText>
                    <StyledLink href="/settings/account">
                        <GobackBtn>
                            <HiOutlineArrowNarrowLeft />
                        </GobackBtn>
                    </StyledLink>
                    User Info
                </HeaderText>
                <p>You can view your account info and change your Email or your Username here</p>
                {!currentUser?.isVerified && (
                    <VerifyContainer>
                        <p>Your email is not verified</p>
                        <VerifyBtn type="button" onClick={() => sendVerifyEmailCurrentUser(currentUser?.email)}>verify</VerifyBtn>
                    </VerifyContainer>
                )}
                <StyledTextField 
                    style={{margin: '0.5rem 0'}}
                    disabled={!enableEmailField} 
                    onChange={handleOnChange} 
                    error={alert.inputName.includes("email")} 
                    helperText={alert.inputName.includes("email") && alert.helperText} 
                    value={userInfoForm.email} 
                    name="email" 
                    label="Email"
                    type="email" 
                    variant="standard"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <ChangeFieldBtn type="button" onClick={() => {
                                    setEnableEmailField(!enableEmailField)
                                    setEnableUsernameField(false)
                                }}>Change</ChangeFieldBtn>
                            </InputAdornment>
                        ),
                    }}
                />
                 <StyledTextField 
                    style={{margin: '0.5rem 0'}} 
                    disabled={!enableUsernameField} 
                    onChange={handleOnChange} 
                    error={alert.inputName.includes("username")} 
                    helperText={alert.inputName.includes("username") && alert.helperText} 
                    value={userInfoForm.username} 
                    name="username" 
                    label="Username"
                    type="text" 
                    variant="standard"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <ChangeFieldBtn type="button" onClick={() => {
                                    setEnableUsernameField(!enableUsernameField)
                                    setEnableEmailField(false)
                                }}>Change</ChangeFieldBtn>
                            </InputAdornment>
                        ),
                    }}
                />
                <StyledTextField 
                    style={{margin: '0.5rem 0'}} 
                    onChange={handleOnChange} 
                    error={alert.inputName.includes("password")} 
                    helperText={alert.inputName.includes("password") && alert.helperText} 
                    value={userInfoForm.currentPassword}
                    name="password"  
                    label="Password"  
                    type={isShowPassword ? "text" : "password"} 
                    variant="standard"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <EyeButton type="button" onClick={() => setIsShowPassword(!isShowPassword)}>{isShowPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</EyeButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <BtnContainer><DoneBtn disabled={!isCanSubmit}>Save</DoneBtn></BtnContainer>
            </form>
        </div>
    )
}
