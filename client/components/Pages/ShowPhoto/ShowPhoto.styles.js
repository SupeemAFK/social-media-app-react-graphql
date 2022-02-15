import styled from "styled-components";

export const Loading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    height: 100vh;
`

export const PostDetailContainer = styled.div`
    position: fixed;
    top: 0;

    display: flex;

    width: 100vw;
    height: 100vh;

    z-index: -1;
    @media screen and (max-width: 768px) {
        flex-direction: column;
        align-items: center;
  }
`

export const ImgContainer = styled.div`
    position: relative;

    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    background-color: ${({ bgcolor }) => bgcolor};

    flex: 5;

    transition: .2s;

    @media screen and (max-width: 1024px) {
        flex: 2;
    }
`

export const CloseBtn = styled.button`
    position: absolute;
    top: 1rem;
    left: 1rem;

    width: 40px;
    height: 40px;

    font-size: 1.25rem;

    color: #ffffff;
    background: #4B4F52;
    border-radius: 50%;
    border: none;

    cursor: pointer;
`

export const DotBtn = styled.button`
    position: fixed;
    top: 1rem;
    right: 1rem;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 40px;
    height: 40px;

    font-size: 2rem;

    color: #ffffff;
    border: none;
    background: none;

    cursor: pointer;

    @media screen and (min-width: 769px) {
        display: none;
    }
`

export const ImgWrapper = styled.div`
    position: fixed;

    display: flex;
    justify-content: center;
    align-items: center;

    max-width: 500px;

    overflow: hidden;
`

export const EmotionBtnContainer = styled.div`
    position: absolute;
    bottom: 0;

    width: 100%;

    z-index: 20;

    @media (min-width: 769px) {
        display: none;
    }
`

export const EmotionBtnWrappper = styled.div`
    background-color: ${({ bgcolor }) => bgcolor};
    filter: brightness(90%);

    display: flex;
    align-items: center;
    justify-content: space-around;

    padding: 1rem;

    transition: .2s;
`

export const EmotionBtn = styled.button`
    font-size: 1.25rem;

    width: 100px;
    height: 50px;

    display: flex;
    justify-content: center;
    align-items: center;

    color: #ffffff;
    background: none;
    border: none;

    cursor: pointer;
`

export const PostDetailWrapper = styled.div`
    display: flex;
    justify-content: center;

    overflow-y: auto;

    height: 100%;

    background-color: ${({ theme }) => theme.secondary};
    border: 1px solid ${({ theme }) => theme.borderColor};
    flex: 1;

    @media screen and (max-width: 768px) {
        display: none;
    }
`