import React from 'react'

//auth
import { useAuth } from '../../../auth/AuthProvider'

//styles and icons
import { MobileDropdownContainer, UserDetails, UserProfileWrapper, Username, SettingsBtnContainer, LogoutBtnContainer } from './MobileDropdown.styles'
import { StyledLink, Image, Button } from '../../../styles/GlobalStyles'
import { IoMdSettings } from 'react-icons/io'
import { IoLogOutOutline } from 'react-icons/io5'

export default function MobileDropdown({ currentUser, isOpenMobileDropdown, setIsOpenMobileDropdown }) {
    const { signout } = useAuth()

    function handleSignout() {
        signout()
        setIsOpenMobileDropdown(false)
    }

    return (
        <MobileDropdownContainer open={isOpenMobileDropdown}>
            <StyledLink href={`/user/${currentUser?.username}`} className="link">
                <UserDetails>
                    <UserProfileWrapper>
                        <Image src={currentUser?.imageUrl} alt="user-profile"  />
                    </UserProfileWrapper>
                    <Username>
                        <p>{currentUser?.name}</p>
                    </Username>
                </UserDetails>
            </StyledLink>

            <StyledLink href='/settings/account' className="link">
                <SettingsBtnContainer>
                    <Button><IoMdSettings /></Button>
                    <p>Settings</p>
                </SettingsBtnContainer>
            </StyledLink>

            <LogoutBtnContainer onClick={handleSignout}>
                <Button><IoLogOutOutline /></Button>
                <p>Logout</p>
            </LogoutBtnContainer>
        </MobileDropdownContainer>
    )
}
