import styled from 'styled-components';

export const PostContainer = styled.div`
  background-color: ${({ theme }) => theme.secondary};
  border: ${({ inPostDetail, theme }) => inPostDetail ? "none" : `1px solid ${theme.borderColor}`};
  border-radius: 10px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  color: ${({ theme }) => theme.fontColor};

  width: ${({ inPostDetail }) => inPostDetail ? "100%" : "650px"};

  margin: 0.5rem 0;

  @media screen and (max-width: 540px) {
    width: 100%;
}
`

export const ImgWrapper = styled.div`
    width: 100%;
    max-height: 500px;
    overflow: hidden;

    cursor: pointer;
`

export const EmojiBtnContainer = styled.div`
  color: ${({ theme }) => theme.fontColor};
  padding: 1rem;

  display: flex;
  justify-content: space-around;
  align-items: center;
`

export const EmojiBtn = styled.button`
    user-select: none;

    color: ${({ theme }) => theme.fontColor};
    display: flex;
    align-items: center;

    font-size: 1rem;

    background: none;
    border: none;
    cursor: ${({ disabled }) => disabled ? "auto" : "pointer"};
    opacity: ${({ disabled }) => disabled ? "0.5" : "1"};

    &:hover {
        opacity: 0.5;
    }
`

export const CommentSection = styled.form`
    border-top: 1px solid ${({ theme }) => theme.borderColor};
    padding: 1rem;

    display: flex;
    align-items: center;
    flex-direction: column;
`

export const InputContainer = styled.div`
    width: 90%;

    display: flex;
    align-items: flex-end;
`

export const CommentImgContainer = styled.div`
    margin-top: 0.5rem;

    width: 90%;

    display: flex;
    justify-content: flex-start;
`

export const CommentImgWrapper = styled.div`
    position: relative;
    width: 150px;
`

export const RemoveImgBtn = styled.button`
    position: absolute;
    top: 0;
    right: 0;

    font-size: 1.5rem;

    color: #4B4F52;
    background: none;
    border: none;

    cursor: pointer;

    transition: .2s;
    &:hover {
        opacity: 0.5;
    }
`

export const SendBtn = styled.button`
    font-size: 1.5rem;

    display: flex;
    justify-content: center;
    align-items: center;

    color: ${({ theme }) => theme.fontColor};
    border: none;
    background: none;

    cursor: ${({ disabled }) => disabled ? "auto" : "pointer"};
    opacity: ${({ disabled }) => disabled ? "0.5" : "1"};

    transition: 0.2s;

    &:hover {
        opacity: 0.5;
    }
`