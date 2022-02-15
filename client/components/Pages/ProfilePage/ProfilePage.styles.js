import styled from 'styled-components'

export const Loading = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    height: calc(100vh - 100px);
`

export const ProfilePageContainer = styled.div`
    display: flex;
    justify-content: center;
`

export const Container = styled.div`
    width: 850px;

    display: flex;
    flex-direction: column;

    @media screen and (max-width: 540px) {
        width: 100%;
    }
`

export const UserProfileContainer = styled.div`
    width: 100%;
`

export const UserBanner = styled.div`
    position: relative;

    padding-bottom: 56.25%;

    width: 100%;
    overflow: hidden;
`

export const BackgroundImage = styled.img`
    position: absolute;
    top: 0; bottom: 0; left: 0; right: 0;

    width: 100%;
    object-fit: cover;
`

export const UserImageContainer = styled.div`
    width: 100%;

    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;
`

export const UserImageWrapper = styled.div`
    width: 150px;
    height: 150px;

    border: 3px solid ${({ theme }) => theme.secondary};
    border-radius: 50%;

    position: absolute;

    overflow: hidden;

    @media screen and (max-width: 540px) {
        width: 100px;
        height: 100px;
    }
`

export const UserDetails = styled.div`
    background-color: ${({ theme }) => theme.secondary};

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    width: 100%;

    padding: 2.5rem;

    @media screen and (max-width: 540px) {
        padding: 1.5rem;
    }
`

export const UsernameContainer = styled.span`
    margin-top: 2.5rem;

    display: flex;
    align-items: center;
    flex-direction: column;
`

export const Username = styled.span`
    font-size: 1.5rem;
    font-weight: 600;

    @media screen and (max-width: 540px) {
        font-size: 1.2rem;
    }
`

export const Userbio = styled.span`
    font-size: 1rem;
    font-weight: 400;
`

export const UserPosts = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`

export const EditProfileBtnContainer = styled.div`
    display: flex;
    justify-content: flex-end;

    width: 100%;

    @media screen and (max-width: 540px) {
        margin-top: 1rem;
    }
`

export const EditProfileBtn = styled.button`
    border: none;
    border-radius: 20px;
    color: ${({ theme }) => theme.fontColor};
    background-color: ${({ theme }) => theme.primary};

    padding: 0.5rem 1rem;
    font-size: 1rem;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    transition: 0.2s;

    &:hover {
        opacity: 0.5;
    }

    
    @media screen and (max-width: 540px) {
        font-size: 0.8rem;
    }
`