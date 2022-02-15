import React, { useEffect, useState } from 'react'
import { GoogleLogin } from 'react-google-login';
import { useAuth } from '../../../auth/AuthProvider'
import { toast } from 'react-toastify';

//styles and icons
import { FcGoogle } from 'react-icons/fc'
import { AuthPage, AuthForm, InputContainer, ForgotPasswordText, BtnContainer, SigninBtn, OauthBtnContainer, OauthText, GoogleBtn, ChangeMode } from './Auth.stlyes';
 
//components
import Input from './Input/Input'

export default function Auth() {
    const { signin, signup, googleSignin, forgotPassword, verifyTotp } = useAuth();

    const [authForm, setAuthForm] = useState({ credentials: '', email: '', password: '', confirmPassword: '', username: '', name: '', token: '' })
    const [formMode, setFormMode] = useState("signin")
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
    const [alert, setAlert] = useState({ helperText: null, inputName: [] })

    useEffect(() => {
        const timeout = setTimeout(() => {
            setAlert({ helperText: null, inputName: [] })
        }, 3000)

        return () => clearTimeout(timeout)
    }, [alert])

    async function handleOnSubmit(e) {
        e.preventDefault()

        //signup check
        if (formMode === 'signup') {
            //check user put all info if not alert
            if (authForm.email === '' || authForm.password === '' || authForm.confirmPassword === '' || authForm.username === '') {
                const inputNamesArray = []
    
                for (const inputName in authForm) {
                    authForm[inputName] === '' && inputNamesArray.push(inputName)
                }
    
                return setAlert({ helperText: 'Please put all of the informations', inputName: inputNamesArray })
            }

            //check password and confirm password match if not alert
            if (authForm.password !== authForm.confirmPassword) {
                setAlert({ helperText: 'Password have to be match', inputName: ['password', 'confirmPassword'] })
                return
            }

            //check password valid if not alert
            const isPasswordValid = is_password_valid(authForm.password)
            if (!isPasswordValid.valid) {
                setAlert({ helperText: isPasswordValid.message, inputName: ['password', 'confirmPassword'] })
                return
            }

            //nothing happend signup
            const { error } = await signup(authForm.email, authForm.username, authForm.name, authForm.password)
            if (error) {
                if (error.message === "Already have user with that email") {
                    return setAlert({ helperText: error.message, inputName: ["email"] })
                }
                if (error.message === "Already have user with that username") {
                    return setAlert({ helperText: error.message, inputName: ["username"] })
                }
            }
            return window.location.href = '/'
        }

        //signin check

        //check user put all info if not alert
        if (authForm.credentials === '' || authForm.password === '') {
            const inputNamesArray = []

            for (const inputName in authForm) {
                authForm[inputName] === '' && inputNamesArray.push(inputName)
            }

            return setAlert({ helperText: 'Please put all of the informations', inputName: inputNamesArray })
        }

        //nothing happend signin
        const { data, error } = await signin(authForm.credentials, authForm.password)
        if (error) {
            if (error.message === "No user with that credentials") {
                return setAlert({ helperText: error.message, inputName: ["credentials"] })
            }
            if (error.message === "Invalid password") {
                return setAlert({ helperText: error.message, inputName: ["password"] })
            }
        }
        if (data?.is_two_factor_required) {
            return setFormMode("token")
        }
        return window.location.href = '/'
    }

    async function verifyTwoFaSecretCode(credentials, token) {
        const { error } = await verifyTotp(credentials, token)
        if (error) {
            return setAlert({ helperText: error.message, inputName: ['token'] })
        }
        return window.location.href = '/'
    }

    async function sendForgotpassword(email) {
        const { error } = await forgotPassword(email)
        if (error) {
            return setAlert({ helperText: error.message, inputName: ["email"] })
        }
        return toast.success("Email has been sent!", {
            autoClose: 5000,
            closeOnClick: true,
            pauseOnHover: false,
        })
    }

    function handleOnChange(e) {
        const name = e.target.name
        const value = e.target.value

        setAuthForm({...authForm, [name]: value})
    }
 
    async function googleSuccess(res) {
        const { data } = await googleSignin(res.tokenId)
        if (data?.is_two_factor_required) {
            return setFormMode("token")
        }
        return window.location.href = '/'
    }

    function googleError() {
        console.log('Google Sign In was unsuccessful. Try again later')
    }

    function changeFormMode(mode) {
        setFormMode(mode)
        setAuthForm({ credentials: '', email: '', password: '', confirmPassword: '', username: '', name: '', token: '' })
        setAlert({ helperText: null, inputName: [] })
    }

    return (
        <AuthPage>
            <AuthForm onSubmit={handleOnSubmit}>
                {(formMode === 'signin' || formMode === 'signup') && <h1>{formMode === 'signup' ? 'Sign Up' : 'Sign In'}</h1>}
                {formMode === 'forgot-password' && <h1>Forgot Password</h1>}
                {formMode === 'token' && <h1>Enter secret code</h1>}

                {formMode === 'token' && (
                    <>
                    <InputContainer>
                        <Input handleOnChange={handleOnChange} alert={alert} authForm={authForm} name="token" label="Secret Code" type="text"  />
                    </InputContainer>
                    <BtnContainer>
                        <SigninBtn type="button" onClick={() => verifyTwoFaSecretCode(authForm.credentials, authForm.token)}>Confirm</SigninBtn>
                    </BtnContainer>
                    </>
                )}
                {formMode === 'forgot-password' && (
                    <>
                    <InputContainer>
                        <Input handleOnChange={handleOnChange} alert={alert} authForm={authForm} name="email" label="Email" type="email"  />
                    </InputContainer>
                    <BtnContainer>
                        <SigninBtn type="button" onClick={() => sendForgotpassword(authForm.email)}>Confirm</SigninBtn>
                    </BtnContainer>
                    </>
                )}
                {(formMode === 'signin' || formMode === 'signup') && (
                    <>
                    <InputContainer>
                        {formMode === 'signin' && <Input handleOnChange={handleOnChange} alert={alert} authForm={authForm} name="credentials" label="Email or Username" type="text" />}
                        {formMode === 'signup' && <Input handleOnChange={handleOnChange} alert={alert} authForm={authForm} name="email" label="Email" type="email" />}
                        {formMode === 'signup' && <Input handleOnChange={handleOnChange} alert={alert} authForm={authForm} name="username" label="Username" type="text" />}
                        {formMode === 'signup' && <Input handleOnChange={handleOnChange} alert={alert} authForm={authForm} name="name" label="Name" type="text" />}
                        <Input handleOnChange={handleOnChange} alert={alert} authForm={authForm} isShowPassword={isShowPassword} setIsShowPassword={setIsShowPassword} name="password" label="Password" type="password"  />
                        {formMode === 'signup' && <Input handleOnChange={handleOnChange} alert={alert} authForm={authForm} isShowPassword={isShowConfirmPassword} setIsShowPassword={setIsShowConfirmPassword} name="confirmPassword" label="Confirm Password" type="password" />}
                        {formMode === 'signin' && <ForgotPasswordText onClick={() => setFormMode("forgot-password")}>Forgot your password?</ForgotPasswordText>}
                    </InputContainer>
                    <BtnContainer>
                        <SigninBtn type="submit">{formMode === 'signup' ? "Sign Up" : "Sign In"}</SigninBtn>
                    </BtnContainer>
                    </>
                )}                

                {formMode === 'signin'&& (
                    <OauthBtnContainer>
                        <OauthText>Or signin with</OauthText>
                        <GoogleLogin
                            clientId="YOUR_CLIENT_ID"
                            render={(renderProps) => (
                                <GoogleBtn onClick={renderProps.onClick}><FcGoogle /></GoogleBtn>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleError}
                            cookiePolicy="single_host_origin"
                        />
                    </OauthBtnContainer>
                )}
                <p>
                    {formMode === 'forgot-password' && (
                        <>
                        Go back to <ChangeMode onClick={() => changeFormMode('signin')}>Sign in</ChangeMode>
                        </>
                    )}
                    {(formMode === 'signin' || formMode === 'signup') && (
                        <>
                        {formMode === 'signup' ? "Have an account? " : "Don't have an account? "}
                        <ChangeMode onClick={() => formMode === 'signup' ? changeFormMode('signin') : changeFormMode('signup')}>
                            {formMode === 'signup' ? "Signin Now" : "Signup Now"}
                        </ChangeMode>
                        </>
                    )}
                </p>
            </AuthForm>
        </AuthPage>
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
