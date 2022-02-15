import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { useAuth } from '../../../../../auth/AuthProvider'

//styles and icons
import { InputAdornment } from '@mui/material'
import { EyeButton } from '../../../Auth/Input/Input.styles'
import { HeaderText } from '../../Settings.styles'
import { StyledLink, StyledTextField } from '../../../../../styles/GlobalStyles'
import { GobackBtn } from '../../Settings.styles'
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { DoneBtn, BtnContainer } from './ChangePassword.styles'

export default function ChangePassword() {
    const { changePassword } = useAuth()

    const [passwordForm, setPasswordForm] = useState({ password: "", newPassword: "", confirmNewPassword: "",})
    const [isShowCurrentPassword, setIsShowCurrentPassword] = useState(false)
    const [isShowNewPassword, setIsShowNewPassword] = useState(false)
    const [isShowConfirmNewPassword, setIsShowConfirmNewPassword] = useState(false)
    const [alert, setAlert] = useState({ helperText: null, inputName: []})
    const isCanSubmit = passwordForm.newPassword !== ""

    useEffect(() => {
        const timeout = setTimeout(() => {
            setAlert({ helperText: null, inputName: [] })
        }, 3000)

        return () => clearTimeout(timeout)
    }, [alert])

    async function handleOnSubmit(e) {
        e.preventDefault()

        if (passwordForm.password === "" ) {
            setAlert({ helperText: "Please enter your password before change anything", inputName: ["currentPassword"] })
            return
        }

        if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
            setAlert({ helperText: "New password and confirm new password must be matched", inputName: ["newPassword", "confirmNewPassword"] })
            return
        }

        const isPasswordValid = is_password_valid(passwordForm.newPassword)
        if (!isPasswordValid.valid) {
            setAlert({ helperText: isPasswordValid.message, inputName: ["newPassword", "confirmNewPassword"] })
            return
        } 

        const { error } = await changePassword(passwordForm.newPassword, passwordForm.password)
        if (error) {
            if (error.message === "Invalid password") {
                return setAlert({ helperText: error.message, inputName: ['password'] })
            }
            if (error.message === "Cannot change the same password") {
                return setAlert({ helperText: error.message, inputName: ['newPassword'] })
            }
        }
        
        toast.success("Password has been updated!", {
            autoClose: 5000,
            closeOnClick: true,
            pauseOnHover: false,
        })
        return setPasswordForm({ password: "", newPassword: "", confirmNewPassword: "",})
    }

    function handleOnChange(e) {
        const name = e.target.name
        const value = e.target.value
        setPasswordForm({...passwordForm, [name]: value})
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
                    Change password
                </HeaderText>
                <p>You can change your password here</p>
                <StyledTextField 
                    style={{margin: '0.5rem 0'}} 
                    onChange={handleOnChange} 
                    error={alert.inputName.includes("password")} 
                    helperText={alert.inputName.includes("password") && alert.helperText} 
                    value={passwordForm.password}
                    name="password"  
                    label="Password"  
                    type={isShowCurrentPassword ? "text" : "password"} 
                    variant="standard"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <EyeButton type="button" onClick={() => setIsShowCurrentPassword(!isShowCurrentPassword)}>{isShowCurrentPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</EyeButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <StyledTextField 
                    style={{margin: '0.5rem 0'}} 
                    onChange={handleOnChange} 
                    error={alert.inputName.includes("newPassword")} 
                    helperText={alert.inputName.includes("newPassword") && alert.helperText} 
                    value={passwordForm.newPassword}
                    name="newPassword"  
                    label="New Password"  
                    type={isShowNewPassword ? "text" : "password"} 
                    variant="standard"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <EyeButton type="button" onClick={() => setIsShowNewPassword(!isShowNewPassword)}>{isShowNewPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</EyeButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <StyledTextField 
                    style={{margin: '0.5rem 0'}} 
                    onChange={handleOnChange} 
                    error={alert.inputName.includes("confirmNewPassword")} 
                    helperText={alert.inputName.includes("confirmNewPassword") && alert.helperText} 
                    value={passwordForm.confirmNewPassword}
                    name="confirmNewPassword"  
                    label="Confirm New Password"  
                    type={isShowConfirmNewPassword ? "text" : "password"} 
                    variant="standard"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <EyeButton type="button" onClick={() => setIsShowConfirmNewPassword(!isShowConfirmNewPassword)}>{isShowConfirmNewPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</EyeButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <BtnContainer><DoneBtn disabled={!isCanSubmit}>Done</DoneBtn></BtnContainer>
            </form>
        </div>
    )
}

//extra function
function is_password_valid(password) {
    const has_letters = (/[a-zA-Z]/).test(password);
    const has_numbers = (/[0-9]/).test(password);
    const has_length = 3 <= password.length && password.length <= 30;

    if (has_letters && has_numbers && has_length) {
        return { valid: true };
    }

    if (!has_letters) {
        return { valid: false, message: "Password must gave letters" };
    }

    if (!has_numbers) {
        return { valid: false, message: "Password must gave numbers" };
    }

    if (!has_length) {
        return { valid: false, message: "Password length must be between 3 and 30" };
    }
}