import styled from 'styled-components'

export const Container = styled.div`
    border: 1px solid ${({ theme }) => theme.borderColor};
    border-radius: 5px;

    background-color: ${({ theme }) => theme.secondary};
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

    width: 650px;

    padding: 1rem;
    margin: 1rem auto;

    display: flex;
    justify-content: center;
    flex-direction: column;

    @media screen and (max-width: 540px) {
        width: 100%;
    }
`

export const CreatePostContainer = styled.div`
    display: flex;
    align-items: center;
`

export const UserProfileWrapper = styled.div`
    border-radius: 50%;

    margin-right: 0.5rem;

    width: 55px;
    height: 55px;

    overflow: hidden;
    cursor: pointer;

    transition: .15s;
    &:hover {
        opacity: 0.5;
    }
`

export const LoginToCreatePostBtn = styled.button`
    font-size: 1.5rem;

    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 1.5rem;

    color: ${({ theme }) => theme.fontColor};
    border: 2px solid ${({ theme }) => theme.borderColor};
    background: none;

    cursor: pointer;

    transition: 0.1s;

    &:hover {
        border: 2px solid #10b981;
    }
`