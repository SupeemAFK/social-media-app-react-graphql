import React from 'react'

//auth
import { useSessionUser } from '../../../../../auth/getSessionUser'

//styles and icons
import { AiOutlineUser } from 'react-icons/ai'
import  { IoIosArrowForward } from 'react-icons/io'
import  { IoKey } from 'react-icons/io5'
import { MdOutlineSecurity } from 'react-icons//md'
import { CircularProgress } from '@mui/material'
import { StyledLink } from '../../../../../styles/GlobalStyles'
import { HeaderText } from '../../Settings.styles'
import { SignInBtn } from '../../../../Navbar/Navbar.styles'
import { Loading, AccountBar, AccountBtn } from './Account.styles'

export default function Account() {
    const { data, loading, error } = useSessionUser()
    const currentUser = data?.getCurrentUser

    if (loading) {
        return (
            <div>
                <HeaderText>
                    Account
                </HeaderText>
                <p>You can change your current Email, Username and Password here</p>
                <Loading>
                    <CircularProgress color="primary" />
                </Loading>
            </div>
        )
    }

    if (!currentUser) {
        return (
            <div>
                <HeaderText>
                    Account
                </HeaderText>
                <p>Please sign in</p>
                <StyledLink href="/auth"><SignInBtn>Sign in</SignInBtn></StyledLink>
            </div>
        )
    }

    return (
        <div>
            <HeaderText>
                Account
            </HeaderText>
            <p>You can change your current Email, Username and Password here</p>
            <AccountBar>
                <StyledLink href="/settings/userinfo">
                    <AccountBtn >
                        <AiOutlineUser style={{ marginRight: "1rem" }} /> User Info <IoIosArrowForward style={{ marginLeft: "auto" }} />
                    </AccountBtn>
                </StyledLink>
                <StyledLink href="/settings/changepassword">
                    <AccountBtn>
                        <IoKey style={{ marginRight: "1rem" }} /> Change Password <IoIosArrowForward style={{ marginLeft: "auto" }} />
                    </AccountBtn>
                </StyledLink>
                <StyledLink href="/settings/security">
                    <AccountBtn>
                        <MdOutlineSecurity style={{ marginRight: "1rem" }} /> Security <IoIosArrowForward style={{ marginLeft: "auto" }} />
                    </AccountBtn>
                </StyledLink>
            </AccountBar>
        </div>
    )
}
