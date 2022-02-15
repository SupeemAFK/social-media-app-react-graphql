import styled from 'styled-components'

export const HeaderText = styled.p`
    font-size: 1.5rem;
    border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`

export const SwitchBtnContainer = styled.div`
    display: flex;
    align-items: center;
`

export const CurrentThemeText = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
`