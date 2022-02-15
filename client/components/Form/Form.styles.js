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

export const FormContainer = styled.div`
    display: flex;
    justify-content: center;
`

export const FormCard = styled.form`
    border: 1px solid ${({ theme }) => theme.borderColor};
    border-radius: 5px;

    position: fixed;

    background-color: ${({ theme }) => theme.secondary};
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

    width: 550px;
    max-height: calc(100vh - 200px);

    display: flex;
    flex-direction: column;
    overflow-y: auto;

    z-index: 100;

    @media screen and (max-width: 540px) {
        width: 300px;
    }

    @media screen and (max-width: 320px) {
        width: 250px;
    }
`

export const FormHeader = styled.div`
    width: 100%;
`

export const LinearProgressContainer = styled.div`
    width: 100%;
`

export const FormWrapper = styled.div`
    padding: 1rem;
`

export const InputContainer = styled.div`
    display: flex;
    align-items: center;
`

export const UserProfileWrapper = styled.div`
    margin-right: 0.5rem;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    overflow: hidden;
`

export const ImgWrapper = styled.div`
    position: relative;

    width: 100%;
`

export const RemoveImgBtn = styled.button`
    position: absolute;
    top: 0;
    right: 0;

    width: 30px;
    height: 30px;

    font-size: 1rem;

    color: #ffffff;
    background-color: #4B4F52;
    border: none;
    border-radius: 50%;
    opacity: 0.7;

    cursor: pointer;
`

export const BtnContainer = styled.div`
    margin-top: 1rem;
    display: flex;
    justify-content: flex-end;
`

export const CreatePostBtn = styled.button`
    font-size: 1.5rem;

    display: flex;
    align-items: center;

    border-radius: 10px;
    color: ${({ theme }) => theme.fontColor};
    border: 2px solid ${({ theme }) => theme.borderColor};
    background: none;

    opacity: ${({ disabled }) => disabled ? "0.5" : "1"};
    cursor: ${({ disabled }) => disabled ? "auto" : "pointer"};

    transition: 0.1s;

    &:hover {
        ${({ disabled }) => !disabled && "border: 2px solid #10b981;"}
    }
`