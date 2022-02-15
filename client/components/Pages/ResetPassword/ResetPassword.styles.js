import styled from 'styled-components'

export const Form = styled.form`
    background: ${({ theme }) => theme.secondary};

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    border-radius: 10px;
    width: 550px;
    max-height: calc(100vh - 200px);

    padding: 1rem;

    display: flex;
    align-items: center;
    flex-direction: column;

    z-index: 100;

    @media screen and (max-width: 540px) {
        width: 300px;
    }

    @media screen and (max-width: 320px) {
        width: 250px;
    }
`
export const SubmitBtn = styled.button`
    align-self: flex-end;
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