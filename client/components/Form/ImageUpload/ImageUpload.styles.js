import styled from 'styled-components'

export const UploadBtn = styled.button`
    font-size: 2rem;

    display: flex;
    justify-content: center;
    align-items: center;

    color: ${({ theme }) => theme.fontColor};
    background: none;
    border: none;

    cursor: pointer;

    transition: 0.2s;

    &:hover {
        opacity: 0.5;
    }
`