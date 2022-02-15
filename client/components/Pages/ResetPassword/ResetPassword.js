import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../../../auth/AuthProvider'
import { toast } from 'react-toastify';

//styles
import { Form, SubmitBtn } from './ResetPassword.styles'
import { StyledTextField } from '../../../styles/GlobalStyles'
import { InputAdornment } from '@mui/material'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { EyeButton } from '../Auth/Input/Input.styles'

export default function ResetPassword() {
    const router = useRouter()
    const { token } = router.query
    const { resetPassword } = useAuth()
    const [resetPasswordForm, setResetPasswordForm] = useState({ newPassword: '', confirmNewPassword: '' })
    const [alert, setAlert] = useState({ helperText: null, inputName: [] })
    const [isShowNewPassword, setIsShowNewPassword] = useState(false)
    const [isShowConfirmNewPassword, setIsShowConfirmNewPassword] = useState(false)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setAlert({ helperText: null, inputName: []})
        }, 3000)
        return () => clearTimeout(timeout)
    }, [alert])

    async function handleOnSubmit(e) {
        e.preventDefault()
        const { data } = await resetPassword(resetPasswordForm.newPassword, token)
        if (data.message === "Success") return toast.success("Password has been reseted!", {
            autoClose: 5000,
            closeOnClick: true,
            pauseOnHover: false,
        })
    }

    function handleOnChange(e) {
        const name = e.target.name
        const value = e.target.value
        setResetPasswordForm({ ...resetPasswordForm, [name]: value })
    }

    return (
        <Form onSubmit={handleOnSubmit}>
            <StyledTextField 
                    style={{margin: '0.5rem 0'}} 
                    onChange={handleOnChange} 
                    error={alert.inputName.includes("newPassword")} 
                    helperText={alert.inputName.includes("newPassword") && alert.helperText} 
                    value={resetPasswordForm.newPassword}
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
                    value={resetPasswordForm.confirmNewPassword}
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
                <SubmitBtn>Submit</SubmitBtn>
        </Form>
    )
}
