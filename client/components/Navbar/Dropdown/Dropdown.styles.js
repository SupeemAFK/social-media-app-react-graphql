import styled from 'styled-components';

export const DropdownContainer = styled.div`
    border-left: 1px solid ${({ theme }) => theme.borderColor};
    border-right: 1px solid ${({ theme }) => theme.borderColor};

    width: 250px;

    display: flex;
    flex-direction: column;

    margin-top: 48px;

    position: fixed;
    top: 0;
    right: 0;
    transform: ${({ open }) => open ? 'translateY(0%)' : 'translateY(-200%)'};
    z-index: ${({ open }) => open ? '20' : '-1'};

    transition: 0.2s;
`

export const DropdownBtn = styled.button`
  display: flex;
  align-items: center;

  font-size: 1rem;

  width: 100%;
  height: 50px;

  color: ${({ theme }) => theme.fontColor};
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  background-color: ${({ theme }) => theme.secondary};

  cursor: pointer;

  transition: .1s;

  &:hover {
    background-color: ${({ theme }) => theme.primary};
  }
`