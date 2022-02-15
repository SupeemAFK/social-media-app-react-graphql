import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import getCsrfToken from './getCsrfToken';

const AuthContext = React.createContext()

export default function AuthProvider({ children }) {
    const [csrfToken, setCsrfToken] = useState(null)

    useEffect(async () => {
        const csrfToken = await getCsrfToken()
        setCsrfToken(csrfToken)
    }, [])
    
    const csrfAxios = axios.create({
        withCredentials: true,
        baseURL: 'http://localhost:5000',
        headers: { 'X-CSRF-TOKEN': csrfToken },
    })

    async function signin(credentials, password) {
        try {
            const { data } = await csrfAxios.post('/auth/signin', { credentials, password })
            return { data, error: null }

        } catch (error) {
            console.error(error)
            return { data: null, error: error.response.data }
        }
    }

    async function signup(email, username, name, password) {
        try {
            const { data } = await csrfAxios.post('/auth/signup', { email, username, name, password })
            return { data, error: null }

        } catch (error) {
            console.error(error)
            return { data: null, error: error.response.data }
        }
    }

    async function googleSignin(tokenId) {
        try {
            const { data } = await csrfAxios.post('/auth/google', { tokenId })
            return { data, error: null }

        } catch (error) {
            console.error(error)
            return { data: null, error: error.response.data }
        }
    }

    async function signout() {
        try {
            await csrfAxios.post('/auth/signout')
            return window.location.href = '/'

        } catch (error) {
            console.error(error)
            return { data: null, error: error.response.data }
        }
    }

    async function forgotPassword(email) {
        try {
            const { data } = await csrfAxios.post('/auth/forgot-password', { email })
            return { data, error: null }

        } catch (error) {
            console.error(error)
            return { data: null, error: error.response.data }
        }
    }

    async function resetPassword(newPassword, token) {
        try {
            const { data } = await csrfAxios.post(`/auth/reset-password?token=${token}`, { newPassword })
            return { data, error: null }

        } catch (error) {
            console.error(error)
            return { data: null, error: error.response.data }
        }
    }

    async function sendVerifyEmail(email) {
        try {
            const { data } = await csrfAxios.post('/auth/send-verify-email', { email })
            return { data, error: null }

        } catch (error) {
            console.error(error)
            return { data: null, error: error.response.data }
        }
    }

    async function verifyEmail(token) {
        try {
            const { data } = await csrfAxios.post(`/auth/verify-email?token=${token}`)
            return { data, error: null }

        } catch (error) {
            console.error(error)
            return { data: null, error: error.response.data }
        }
    }

    async function changeEmail(newEmail, password) {
        try {
            const { data } = await csrfAxios.post('/auth/change-email', { newEmail, password })
            return { data, error: null }

        } catch (error) {
            console.error(error)
            return { data: null, error: error.response.data }
        }
    }

    async function changeUsername(newUsername, password) {
        try {
            const { data } = await csrfAxios.post('/auth/change-username', { newUsername, password })
            return { data, error: null }

        } catch (error) {
            console.error(error)
            return { data: null, error: error.response.data }
        }
    }

    async function changePassword(newPassword, password) {
        try {
            const { data } = await csrfAxios.post('/auth/change-password', { newPassword, password })
            return { data, error: null }

        } catch (error) {
            console.error(error)
            return { data: null, error: error.response.data }
        }
    }

    async function generateTotpSecret(password) {
        try {
            const { data } = await csrfAxios.post('/auth/generate-totp-secret', { password })
            return { data, error: null }

        } catch (error) {
            console.error(error)
            return { data: null, error: error.response.data }
        }
    }

    async function enable2FA(token) {
        try {
            const { data } = await csrfAxios.post('/auth/enable-2FA', { token })
            return { data, error: null }

        } catch (error) {
            console.error(error)
            return { data: null, error: error.response.data }
        }
    }

    async function verifyTotp(credentials, token) {
        try {
            const { data } = await csrfAxios.post('/auth/verify-totp', { credentials, token })
            return { data, error: null }
            
        } catch (error) {
            console.error(error)
            return { data: null, error: error.response.data }
        }
    }

    async function deactivate2FA(password) {
        try {
            const { data } = await csrfAxios.post('/auth/deactivate-2FA', { password })
            return { data, error: null }
            
        } catch (error) {
            console.error(error)
            return { data: null, error: error.response.data }
        }
    }

    if (!csrfToken) {
        return <div></div>
    }

    return (
        <AuthContext.Provider value={{
            signin,
            signup,
            googleSignin,
            signout,
            forgotPassword,
            resetPassword,
            sendVerifyEmail,
            verifyEmail,
            changeEmail,
            changeUsername,
            changePassword,
            generateTotpSecret,
            enable2FA,
            verifyTotp,
            deactivate2FA,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext)
}
