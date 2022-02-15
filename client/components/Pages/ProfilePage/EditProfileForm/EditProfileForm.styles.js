import styled from 'styled-components'

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    width: 100%;
    height: 100%;

    background-color: rgba(0, 0, 0, 0.5);

    cursor: pointer;

    z-index: 100;
`

export const Image = styled.img`
    width: 100%;
    object-fit: cover;
    filter: brightness(50%);
`

export const BtnContainer = styled.div`
    display: flex;
    align-items: center;

    position: absolute;
    z-index: 1000;
`

export const Btn = styled.button`
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

    cursor: pointer;

    transition: .2s;

    &:hover {
       opacity: 0.5;
    }
`

export const EditProfileFormContainer = styled.div`
    display: flex;
    justify-content: center;
`

export const Form = styled.form`
    border: 1px solid ${({ theme }) => theme.borderColor};
    border-radius: 5px;

    position: fixed;

    background-color: ${({ theme }) => theme.secondary};
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

    width: 550px;
    max-height: calc(100vh - 200px);

    display: flex;
    flex-direction: column;

    z-index: 100;

    @media screen and (max-width: 540px) {
        width: 300px;
    }

    @media screen and (max-width: 320px) {
        width: 250px;
    }
`

export const FormHeaderContainer = styled.div`
    position: relative;

    height: 60px;

    display: flex;
    flex-direction: column;
    align-items: center;
`

export const LinearProgressContainer = styled.div`
    border-radius: 5px;
    width: 100%;

    z-index: 1000;
`

export const FormHeader = styled.header`
    width: 100%;

    display: flex;
    justify-content: space-between;

    border-radius: 5px;
    background-color: ${({ theme }) => theme.secondary};
    padding: 1rem;
`

export const SaveBtn = styled.button`
    font-size: 1rem;

    padding: 0.2rem 1rem;

    display: flex;
    justify-content: center;
    align-items: center;

    color: ${({ theme }) => theme.fontColor};
    background-color: ${({ theme }) => theme.primary};
    border-radius: 20px;
    border: none;

    opacity: ${({ disabled }) => disabled ? "0.5" : "1"};
    cursor: ${({ disabled }) => disabled ? "auto" : "pointer"};

    transition: 0.2s;

    &:hover {
        background-color: ${({ theme }) => theme.borderColor};
    }
`

export const UserProfile = styled.div`
    max-height: calc(100vh - 200px);
    overflow-y: auto;
`

export const UserBannerContainer = styled.div`
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

export const UserBanner = styled.div`
    position: relative;

    padding-bottom: 56.25%;

    width: 100%;
    overflow: hidden;

    filter: brightness(50%);
`


export const BackgroundImage = styled.img`
    position: absolute;
    top: 0; bottom: 0; left: 0; right: 0;

    width: 100%;
    object-fit: cover;
    z-index: -1;
`

export const UserImageContainer = styled.div`
    width: 100%;

    position: relative;

    display: flex;
    align-items: center;
`

export const UserImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    width: 130px;
    height: 130px;

    border: 3px solid ${({ theme }) => theme.primary};
    border-radius: 50%;

    margin-left: 1.5rem;

    position: absolute;

    overflow: hidden;

    @media screen and (max-width: 540px) {
        width: 90px;
        height: 90px;
    }
`

export const TextFieldContainer = styled.div`
    border-top: 1px solid ${({ theme }) => theme.borderColor};

    margin-top: 15%;
    padding: 1rem;

    @media (max-width: 540px) {
        margin-top: 20%;
    }
`