import styled from 'styled-components'

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    width: 100%;
    height: 100%;

    background-color: rgba(0, 0, 0, 0.5);

    cursor: pointer;

    z-index: 1000;
`

export const ProfilePicEditorContainer = styled.div`
    position: absolute;

    width: 100%;
    height: calc(100vh - 100px);

    display: flex;
    justify-content: center;
    align-items: center;
`

export const ProfilePicEditorPaper = styled.div`
    border-radius: 5px;
    background-color: ${({ theme }) => theme.secondary};

    position: fixed;

    z-index: 1000;
`

export const Header = styled.header`
    padding: 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    padding: 1rem;
`

export const CropperContainer = styled.div`
    width: 500px;
    height: 500px;

	position: relative;

    @media (max-width: 540px) {
        width: 300px;
        height: 300px;
    }
`

export const BtnContainer = styled.div`
    width: 100%;

    margin-top: 1rem;

    display: flex;
    justify-content: flex-end;
`

export const DoneBtn = styled.button`
    font-size: 1rem;

    padding: 0.5rem 1rem;

    color: ${({ theme }) => theme.fontColor};
    border: 1px solid ${({ theme }) => theme.borderColor};
    border-radius: 20px;
    background-color: ${({ theme }) => theme.primary};

    cursor: pointer;

    transition: .2s;

    &:hover {
        color: #10b981;
        border: 1px solid #10b981;
    }
`