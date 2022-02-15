import styled from 'styled-components'

export const HeaderContainer = styled.header`
    position: relative;
    padding: 1rem;
`

export const TopHeader = styled.div`
    display: flex;
    justify-content: space-between;
`

export const Creator = styled.div`
    display: flex;
    align-items: center;
`

export const ProfileWrapper = styled.div`
    border-radius: 50%;

    width: 50px;
    height: 50px;

    margin-right: 0.7rem;

    overflow: hidden;
    cursor: pointer;

    transition: 0.2s;

    &:hover {
        opacity: 0.5;
    }
`

export const ProfileDetails = styled.div`
    display: flex;
    flex-direction: column;
`

export const CreatedAt = styled.span`
    font-size: 14px;
    font-weight: 300;
`

export const DotBtn = styled.button`
    display: flex;
    align-items: center;

    font-size: 1rem;

    color: ${({ theme }) => theme.fontColor};
    background: none;
    border: none;
    cursor: pointer;

    &:hover {
        opacity: 0.5;
    }
`

export const SeeMore = styled.span`
    font-weight: 600;
    color: ${({ theme }) => theme.fontColor};
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`