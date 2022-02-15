import React from 'react'

//auth
import { useAuth } from '../../../auth/AuthProvider'

//styles and icons
import { StyledLink } from '../../../styles/GlobalStyles'
import { IoLogOutOutline } from 'react-icons/io5'
import { IoMdSettings} from 'react-icons/io'
import { DropdownContainer, DropdownBtn } from './Dropdown.styles'

export default function Dropdown({ isOpenDropdown, setIsOpenDropdown }) {
    const { signout } = useAuth()

    function handleSignout() {
        signout()
        setIsOpenDropdown(false)
    }

    return (
        <DropdownContainer open={isOpenDropdown}>
            <StyledLink href="/settings/account">
                <DropdownBtn><IoMdSettings style={{ marginRight: "1rem" }} />Settings</DropdownBtn>
            </StyledLink>
            <DropdownBtn onClick={() => handleSignout()}><IoLogOutOutline style={{ marginRight: "1rem" }} />Logout</DropdownBtn>
        </DropdownContainer>
    )
}
