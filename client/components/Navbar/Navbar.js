import React, { useState } from 'react'

//auth
import { useSessionUser } from '../../auth/getSessionUser'

//styles and icons
import { AppBar, LogoContainer, LogoWrapper, LogoText, Right, UserProfileWrapper, UserName, DropdownBtnWrapper, Hamburger, SignInBtn } from './Navbar.styles'
import { CircularProgress } from '@mui/material'
import { IoMdArrowDropdown } from 'react-icons/io'
import { GiHamburgerMenu } from 'react-icons/gi'
import { StyledLink, Button, Image } from '../../styles/GlobalStyles'

//components
import Dropdown from './Dropdown/Dropdown'
import MobileDropdown from './MobileDropdown/MobileDropdown'

export default function Navbar() {
    const { data, loading } = useSessionUser()
    const [isOpenDropdown, setIsOpenDropdown] = useState(false)
    const [isOpenMobileDropdown, setIsOpenMobileDropdown] = useState(false)
    const currentUser = data?.getCurrentUser

    function closeDropdown() {
        setIsOpenDropdown(false)
        setIsOpenMobileDropdown(false)
    }

    return (
        <div>
            <Dropdown isOpenDropdown={isOpenDropdown} setIsOpenDropdown={setIsOpenDropdown} />
            <MobileDropdown currentUser={currentUser} isOpenMobileDropdown={isOpenMobileDropdown} setIsOpenMobileDropdown={setIsOpenMobileDropdown} />
            <AppBar>
                <div>
                    <StyledLink href="/">
                        <LogoContainer onClick={() => closeDropdown()}>
                            <LogoWrapper>
                                <Image src="https://pbs.twimg.com/profile_images/1143711808118755328/Rf0Wt4GQ.jpg" alt="logo" />
                            </LogoWrapper>
                            <LogoText>Supeem Social</LogoText>
                        </LogoContainer>
                    </StyledLink>
                </div>
                {loading ? <CircularProgress /> : (
                    <Right>
                        {currentUser ? (
                            <>
                                {/* show on small screen */}
                                <Hamburger onClick={() => setIsOpenMobileDropdown(!isOpenMobileDropdown)}><GiHamburgerMenu /></Hamburger>
                
                                {/* show on big screen */}
                                <StyledLink href={`/user/${currentUser?.username}`}>
                                    <UserProfileWrapper>
                                        <Image src={currentUser?.imageUrl} alt="user-profile" />
                                    </UserProfileWrapper>
                                </StyledLink>
                                <UserName>
                                    <p>{currentUser?.name}</p>
                                </UserName>
                                <DropdownBtnWrapper onClick={() => setIsOpenDropdown(!isOpenDropdown)}>
                                    <Button><IoMdArrowDropdown /></Button>
                                </DropdownBtnWrapper>
                            </>
                        ) : (
                            <StyledLink href="/auth">
                                <SignInBtn>Sign in</SignInBtn>
                            </StyledLink>
                        )}
                    </Right>
                )}
            </AppBar>
        </div>
    )
}       
