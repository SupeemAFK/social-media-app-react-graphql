import styled from 'styled-components';

export const MobileDropdownContainer = styled.div`
    background-color: ${({ theme }) => theme.secondary};
    border: 1px solid ${({ theme }) => theme.borderColor};

    display: flex;
    justify-content: center;
    flex-direction: column;

    width: 200px;

    margin-top: 48px;

    position: fixed;
    top: 0;
    right: 0;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};

    transition: 0.2s;

    z-index: 20;
`

export const UserDetails = styled.div`
    border-bottom: 1px solid ${({ theme }) => theme.borderColor};

    display: flex;
    justify-content: center;
    align-items: center;
`

export const UserProfileWrapper = styled.div`
    margin: 0 0.5rem;

    border-radius: 50%;

    width: 30px;
    height: 30px;

    overflow: hidden;

    cursor: pointer;

    transition: 0.2s;
`

export const Username = styled.div`
    max-width: 60%;

    display: flex;
    justify-content: center;
`

export const SettingsBtnContainer = styled.div`
    border-bottom: 1px solid ${({ theme }) => theme.borderColor};

    display: flex;
    justify-content: center;
    align-items: center;
`

export const LogoutBtnContainer = styled.div`
    border-bottom: 1px solid ${({ theme }) => theme.borderColor};

    display: flex;
    justify-content: center;
    align-items: center;
`