import styled from 'styled-components'

export const AuthPage = styled.div`
    height: 100vh;

    background-color: ${({ theme }) => theme.secondary};

    display: flex;
    justify-content: center;
    align-items: center;
`

export const AuthForm = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.borderColor};
    background-color: ${({ theme }) => theme.secondary};

    width: 500px;

    padding: 2.5rem;

    
    @media screen and (max-width: 540px) {
        border-radius: 0;
        border: none;
        width: 100%;
        height: calc(100vh - 100px);
    }

    @media screen and (max-width: 320px) {
        justify-content: flex-start;

        border-radius: 0;
        border: none;
        width: 100%;
        height: 100vh;
    }
`

export const InputContainer = styled.div`
    width: 100%;
`

export const ForgotPasswordText = styled.p`
    width: 100%;

    display: flex;
    justify-content: flex-end;

    font-size: 0.9rem;

    cursor: pointer;
`

export const BtnContainer = styled.div`
    margin-top: 1rem;

    width: 100%;
    display: flex;
    justify-content: center;

    @media screen and (max-width: 540px) {
        width: 100%;
        display: flex;
        justify-content: center;
    }
`

export const SigninBtn = styled.button`
    padding: 0.5rem 1rem;

    width: 100%;

    font-size: 1rem;

    color: #3b82f6;
    background-color: ${({ theme }) => theme.secondary};
    border: none;
    border: 1px solid #3b82f6;
    border-radius: 15px;

    cursor: pointer;

    transition: 0.2s;

    &:hover {
        color: ${({ theme }) => theme.secondary};
        background-color: #3b82f6;
    }
`

export const OauthBtnContainer = styled.div`
    margin: 1rem 0;

    display: flex;
    align-items: center;
    flex-direction: column;
`

export const OauthText = styled.p`
    font-size: 0.9rem;
`

export const GoogleBtn = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 2rem;

    border-radius: 50%;
    border: none;
    background-color: ${({ theme }) => theme.secondary};

    width: 50px;
    height: 50px;

    cursor: pointer;

    transition: 0.2s;

    &:hover {
        opacity: 0.5;
    }
`

export const ChangeMode = styled.span`
    color: #3b82f6;
    cursor: pointer;
`