import styled from 'styled-components';

export const EyeButton = styled.button`
    font-size: 1.5rem;

    color: ${({ theme }) => theme.inputColor};
    background: none;
    border: none;

    cursor: pointer;
`