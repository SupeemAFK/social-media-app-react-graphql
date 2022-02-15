import styled from 'styled-components'

export const Loading = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const BtnContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`

export const SaveBtn = styled.button`
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

export const AccountBar = styled.div`
    display: flex;
    flex-direction: column;
`

export const AccountBtn = styled.button`
    font-size: 1rem;

    display: flex;
    align-items: center;

    width: 100%;

    padding: 1rem;

    border-radius: 10px;
    color: ${({ theme }) => theme.fontColor};
    border: none;
    background: none;

    cursor: pointer;

    transition: 0.1s;

    &:hover {
        background-color: ${({ theme }) => theme.primary};
    }
`