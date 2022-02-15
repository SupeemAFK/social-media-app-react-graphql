import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'

//auth
import { useAuth } from '../../../../../auth/AuthProvider'
import { useSessionUser } from '../../../../../auth/getSessionUser'

//styles and icons
import { Modal, InputAdornment } from '@mui/material'
import { EnableTwoFaContainer, OpenTwoFaBtn, EnableTwoFaForm, SubmitBtn, ImageContainer } from './Security.styles'
import { HeaderText, GobackBtn } from '../../Settings.styles'
import { StyledLink, StyledTextField, Image } from '../../../../../styles/GlobalStyles'
import { AiOutlineEye } from 'react-icons/ai'
import { AiOutlineEyeInvisible } from 'react-icons/ai'
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi'
import { EyeButton } from '../../../Auth/Input/Input.styles'

//graphql
import { GET_CURRENT_USER } from '../../../../../lib/Queries';

export default function Security() {
    const { generateTotpSecret, enable2FA, deactivate2FA } = useAuth()
    const { data, client } = useSessionUser()
    const currentUser = data?.getCurrentUser
    const [twoFaForm, setTwoFaForm] = useState({ token: '', password: '' })
    const [twoFaQRcode, setTwoFaQRcode] = useState('')
    const [isShowCurrentPassword, setIsShowCurrentPassword] = useState(false)
    const [alert, setAlert] = useState({ helperText: null, inputName: [] })
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setAlert({ helperText: null, inputName: [] })
        }, 3000)

        return () => clearTimeout(timeout)
    }, [alert])

    async function handleonSubmit(e) {
        e.preventDefault()

        //disable 2Fa
        if (currentUser?.two_factor_enabled) {
            const { error } = await deactivate2FA(twoFaForm.password)
            if (error) {
                return setAlert({ helperText: error.message, inputName: ['password']})
            }
            toast.success("Two factor authentication has been disabled!", {
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: false,
            })
            setOpenModal(false)
        }

        //2.Enter secret code
        else if (twoFaQRcode) {
            const { error } = await enable2FA(twoFaForm.token)
            if (error) {
                return setAlert({ helperText: error.message, inputName: ['token']})
            }
            toast.success("Two factor authentication has been enabled!", {
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: false,
            })
            setOpenModal(false)
        } 

        //1.Enter password
        else {
            const { data, error } = await generateTotpSecret(twoFaForm.password)
            if (error) {
                return setAlert({ helperText: error.message, inputName: ['password']})
            }
            setTwoFaQRcode(data.data_url)
        }
        
        return client.refetchQueries({ include: [GET_CURRENT_USER] })
    }

    function handleOnChange(e) {
        const value = e.target.value
        const name = e.target.name
        setTwoFaForm({ ...twoFaForm, [name]: value })
    }

    function handleModalClose() {
        setOpenModal(false)
        setTwoFaQRcode('')
        setTwoFaForm({ token: '', password: '' })
        setIsShowCurrentPassword(false)
    }

    return (
        <div>
            <Modal
                open={openModal}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <EnableTwoFaForm onSubmit={handleonSubmit}>
                    {twoFaQRcode ? (
                        <>
                        <ImageContainer>
                            <Image src={twoFaQRcode} alt="two_fa_qrcode" />
                        </ImageContainer>
                        <StyledTextField 
                            style={{margin: '0.5rem 0'}} 
                            onChange={handleOnChange} 
                            error={alert.inputName.includes("token")} 
                            helperText={alert.inputName.includes("token") && alert.helperText} 
                            value={twoFaForm.token}
                            name="token"  
                            label="Secret Code"  
                            variant="standard"
                        />
                        <SubmitBtn type="submit">Submit</SubmitBtn>
                        </>
                    ) : (
                        <>
                        <StyledTextField 
                            style={{margin: '0.5rem 0'}} 
                            onChange={handleOnChange} 
                            error={alert.inputName.includes("password")} 
                            helperText={alert.inputName.includes("password") && alert.helperText} 
                            value={twoFaForm.password}
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
                        <SubmitBtn type="submit">Submit</SubmitBtn>
                        </>
                    )} 
                </EnableTwoFaForm>
            </Modal>
            <HeaderText>
                <StyledLink href="/settings/account">
                    <GobackBtn>
                        <HiOutlineArrowNarrowLeft />
                    </GobackBtn>
                </StyledLink>
                Security
            </HeaderText>
            <p>
                You can adjust or add more security like 2FA method to your account.
            </p>
            <EnableTwoFaContainer>
                {currentUser?.two_factor_enabled ? (
                    <>
                    <p>You've already enabled two-factor authentication disabled button will disabled two-factor authentication
                        on your account
                    </p>
                    <OpenTwoFaBtn red={true} type="button" onClick={() => setOpenModal(true)}>Disable</OpenTwoFaBtn>
                    </>
                ) : (
                    <>
                    <p>Enable two factor authentication</p>
                    <OpenTwoFaBtn type="button" onClick={() => setOpenModal(true)}>Enable</OpenTwoFaBtn>
                    </>
                )}
            </EnableTwoFaContainer>
        </div>
    )
}

