import styled from 'styled-components'

export const BtnContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center
`

export const DoneBtn = styled.button`
    font-size: 1rem;

    display: flex;
    align-items: center;

    padding: 0.7rem 1rem;

    border-radius: 10px;
    color: ${({ theme }) => theme.fontColor};
    border: 1px solid ${({ theme }) => theme.borderColor};
    background: none;

    opacity: ${({ disabled }) => disabled ? "0.5" : "1"};
    cursor: ${({ disabled }) => disabled ? "auto" : "pointer"};

    transition: 0.1s;

    &:hover {
        ${({ disabled }) => !disabled && "border: 1px solid #10b981;"}
    }
`

export const ChangeFieldBtn = styled.button`
    color: ${({ theme }) => theme.fontColor};
    border: 1px solid ${({ theme }) => theme.borderColor};
    border-radius: 10px;
    background: none;

    padding: 0.25rem;

    cursor: pointer;

    transition:  .2s;
    &:hover {
        border: 1px solid #10b981;;
    }
`

export const VerifyContainer = styled.div`
    color: #ef4444;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const VerifyBtn = styled.button`
    color: #ef4444;
    border: 1px solid ${({ theme }) => theme.borderColor};
    border-radius: 10px;
    background: none;

    padding: 0.45rem;

    cursor: pointer;

    transition:  .2s;
    &:hover {
        border: 1px solid #ef4444;
    }
`