import styled from 'styled-components';

export const AppBar = styled.div`
    position: fixed;
    top: 0;

    background-color: ${({ theme }) => theme.secondary};
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);

    width: 100%;
    height: 48px;

    padding: 0 2.5rem;

    display: flex;
    justify-content: space-between;
    align-items: center;

    z-index: 10;

    @media screen and (max-width: 540px) {
        padding: 0 1.5rem;
    }
` 

export const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
`

export const LogoWrapper = styled.div`
    border-radius: 50%;
    width: 30px;
    height: 30px;
    overflow: hidden;

    @media screen and (max-width: 768px) {
        width: 35px;
        height: 35px;
    }

    @media screen and (max-width: 540px) {
        width: 35px;
        height: 35px;
    }
`

export const LogoText = styled.h1`
    font-size: 1.25rem;
    font-weight: 700;

    margin: 0 1rem;

    color: #9476e8;

    @media screen and (max-width: 768px) {
        font-size: 1rem;
        margin: 0 0.5rem;
        color: #9476e8;
    }

    @media screen and (max-width: 540px) {
        font-size: 1rem;
        margin: 0 0.5rem;
    }
`

export const Right = styled.div`
    display: flex;
    align-items: center;
`

export const DropdownBtnWrapper = styled.div`
    margin-left: 1rem;

    @media screen and (max-width: 540px) {
        display: none;
    }
`

export const UserProfileWrapper = styled.div`
    margin: 0 1rem;

    border-radius: 50%;
    width: 35px;
    height: 35px;
    overflow: hidden;

    cursor: pointer;

    transition: 0.2s;

    &:hover {
        opacity: 0.5;
    }

    @media screen and (max-width: 768px) {
        width: 35px;
        height: 35px;
    }

    @media screen and (max-width: 540px) {
        display: none;
    }
`

export const UserName = styled.div`
    font-size: 1.25rem;
    font-weight: 400;

    @media screen and (max-width: 768px) {
        font-size: 1rem;
    }

    @media screen and (max-width: 540px) {
        display: none;
    }
`

export const Hamburger = styled.button`
    font-size: 1.5rem;

    color: ${({ theme }) => theme.fontColor};
    background: none;
    border: none;

    display: none;

    @media screen and (max-width: 540px) {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`

export const SignInBtn = styled.button`
    font-size: 1rem;

    max-width: 150px;

    border: none;
    border: 1px solid #3b82f6;
    border-radius: 10px;
    background: none;
    color: #3b82f6;

    padding: 0.5rem 1rem;

    cursor: pointer;

    transition: 0.2s;

    &:hover {
        color: #ffffff;
        background: #3b82f6;
    }

    @media screen and (max-width: 768px) {
        font-size: 1rem;
    }

    @media screen and (max-width: 540px) {
        font-size: 1rem;
    }
`