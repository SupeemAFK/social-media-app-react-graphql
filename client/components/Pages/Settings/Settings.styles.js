import styled from 'styled-components'

export const SettingsPage = styled.div`
    min-height: calc(100vh - 48px);

    display: flex;
    justify-content: center;

    background-color: ${({ theme }) => theme.secondary};
    
    @media screen and (max-width: 540px) {
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
`

export const SettingDetailsBar = styled.div`
    border: 1px solid ${({ theme }) => theme.borderColor};
    border-radius: 10px;

    width: 200px;

    @media screen and (max-width: 540px) {
        width: 90%;
    }
`

export const SettingsText = styled.p`
    padding: 0 1rem;
    font-weight: 600;

    display: flex;
    align-items: center;
`

export const HeaderText = styled.p`
    display: flex;
    align-items: center;

    font-size: 1.5rem;
    border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`

export const SettingsListContainer = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
`

export const SettingsList = styled.li`
    padding: 1rem;
    border-top: 1px solid ${({ theme }) => theme.borderColor};
    cursor: pointer;
`

export const SettingsDetails = styled.div`
    width: 50vw;

    padding: 1rem;

    @media screen and (max-width: 540px) {
        width: 100%;
    }
`

export const GobackBtn = styled.button`
    font-size: 1.5rem;

    display: flex;
    align-items: center;

    color: ${({ theme }) => theme.fontColor};
    border: none;
    background: none;

    cursor: pointer;

    transition: 0.1s;

    &:hover {
        opacity: 0.5;
    }
`