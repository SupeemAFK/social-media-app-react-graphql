import styled from 'styled-components'

export const UpdateProfileContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    width: 100%;
    height: calc(100vh - 100px);
`

export const HeaderText = styled.h1`
    color: #7C3AED;

    display: flex;
    justify-content: center;
    align-items: center;
`

export const UpdateProfileForm = styled.form`
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.borderColor};
    background-color: ${({ theme }) => theme.secondary};

    width: 500px;

    @media (max-width: 540px) {
        width: 100%;
    }
`

export const Header = styled.header`
    display: flex;
    align-items: center;

    padding: 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.borderColor};

    font-weight: 500;
` 

export const Logo = styled.div`
    border-radius: 50%;

    width: 30px;
    height: 30px;

    margin-right: 0.5rem;

    overflow: hidden;
`

export const Container = styled.div`
    padding: 1rem;
`

export const ImageWrapper = styled.div`
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    margin: 0 auto;

    width: 150px;
    height: 150px;

    border-radius: 50%;

    overflow: hidden;
`

export const AddImageBtn = styled.button`
    position: absolute;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 30px;
    height: 30px;

    font-size: 1.5rem;

    color: #e6e6e6;
    background: none;
    border: none;
    border-radius: 50%;

    z-index: 50;

    cursor: pointer;

    transition: .2s;

    &:hover {
       opacity: 0.5;
    }
`

export const ProfileImage = styled.img`
    width: 100%;
    object-fit: cover;
    filter: brightness(60%);
`

export const BtnContainer = styled.div`
    display: flex;
    align-items: center;
`

export const NextBtn = styled.button`
    font-size: 1.2rem;

    margin-left: auto;

    color: ${({ theme }) => theme.fontColor};
    background: none;
    border: none;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    transition: .2s;

    &:hover {
        color: #10b981;
    }
`

export const PrevBtn = styled.button`
    font-size: 1.2rem;

    margin-right: auto;

    color: ${({ theme }) => theme.fontColor};
    background: none;
    border: none;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    transition: .2s;

    &:hover {
        color: #10b981;
    }
`

export const DoneBtn = styled.button`
    font-size: 1.2rem;

    margin-left: auto;

    color: ${({ theme }) => theme.fontColor};
    background: none;
    border: none;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    transition: .2s;

    &:hover {
        color: #10b981;
    }
`