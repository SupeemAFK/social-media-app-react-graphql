import styled from 'styled-components'

export const CommentContainer = styled.div`
    display: flex;
    align-items: center;

    width: 100%;
`

export const CommentDetail = styled.div`
    display: flex;
    align-items: flex-start;
`

export const ProfileContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ProfileWrapper = styled.div`
    margin-top: 1rem;
    margin-right: 0.5rem;

    width: 35px;
    height: 35px;

    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    transition:  .2s;

    &:hover {
        opacity: 0.5;
    }
`

export const CommentMessageContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
`

export const CommentMessageWrapper = styled.p`
    max-width: 100%;

    display: flex;
    flex-direction: column;
`

export const CommentMessage = styled.span`
    background-color: ${({ theme }) => theme.commentColor};
    border-radius: 20px;

    padding: 0.5rem 1rem;

    display: flex;
    flex-direction: column;
`

export const Name = styled.span`
    white-space: nowrap;

    font-weight: 600;
    font-size: 0.8rem;
`

export const CommentImgWrapper = styled.span`
    border-radius: 25px;
    max-width: 200px;
    overflow: hidden;
`

export const CommentOption = styled.div`
    width: 50%;

    position: relative;
`

export const CommentBtn = styled.button`
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