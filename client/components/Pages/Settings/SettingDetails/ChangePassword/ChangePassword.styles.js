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

