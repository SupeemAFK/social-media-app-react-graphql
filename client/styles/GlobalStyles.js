import { createGlobalStyle } from 'styled-components'
import Link from 'next/link'
import { TextField, Menu, MenuItem } from '@mui/material';
import styled from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  
body {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.fontColor};

    margin: 0;
    padding: 0;
}
`
export const Content = styled.div`
    margin-top: 48px;
`

export const StyledLink = styled(Link)`
    text-decoration: none;
    color: ${({ theme }) => theme.fontColor};
`

export const Image = styled.img`
    width: 100%;
    object-fit: cover;
`

export const Button = styled.button`
    font-size: 2.5rem;

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

    @media screen and (max-width: 540px) {
        font-size: 1.5rem;
    }
`

export const StyledTextField = styled(TextField)`
    width: ${({ width }) => width ? width : "100%"};

    & .MuiOutlinedInput-root {
      & fieldset {
        border-radius: 30px;
      };
    };

    & .MuiInputBase-root {
        color: ${({ theme }) => theme.fontColor};
    }
    & label {
        color: ${({ theme }) => theme.inputColor};
    }
    & .MuiInput-underline::before {
        border-color: ${({ theme }) => theme.inputColor};
    }
    && .MuiInput-underline:hover::before {
        border-color: ${({ theme }) => theme.inputColor};
    }
`


export const StyledMenu = styled(Menu)`
    & .MuiPaper-root {
        color: ${({ theme }) => theme.fontColor};
        background-color: ${({ theme }) => theme.secondary};
    }
`

export const StyledMenuItem = styled(MenuItem)`
    & .MuiPaper-root {
        color: ${({ theme }) => theme.fontColor};
        background-color: ${({ theme }) => theme.secondary};
    }
    &:hover {
        background-color: ${({ theme }) => theme.primary} !important;
    }
`