import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../../../auth/AuthProvider'

//styles and icons
import { CircularProgress } from '@mui/material'
import { Container } from './VerifyEmail.styles'
import { BsFillBagCheckFill } from 'react-icons/bs'

export default function VerifyEmail() {
    const router = useRouter()
    const { verifyEmail } = useAuth()
    const { token } = router.query
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchVerify = async () => {
            const { data } = await verifyEmail(token)
            if (data?.message === "Success") return setLoading(false)
        }
        fetchVerify()
    }, [])

    if (loading) {
        return (
            <Container>
                <h1>Verfying... <CircularProgress /></h1>
            </Container>
        )
    }

    return (
        <Container>
            <h1>Verify success <BsFillBagCheckFill /></h1>
        </Container>
    )
}
