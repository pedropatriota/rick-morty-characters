import styled from "styled-components";

export const SearchContainer = styled.div<{ expand: string }>`
  width: 100%;
  max-width: 34rem;
  height: ${({ expand }) => (expand === "true" ? "30rem" : "4rem")};
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  background-color: #fff;
  overflow: hidden;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  transition: height 0.5s ease-in-out;
`;

export const InputContainer = styled.div`
  width: 100%;
  min-height: 4rem;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 1rem;
`;

export const Input = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  background-color: transparent;
  font-size: 1.2rem;
  font-weight: 500;

  &:focus {
    outline: none;
    border-bottom: 1px solid #ccc;
  }
  &::placeholder {
    color: #ccc;
    font-size: 1rem;
  }
`;

export const CloseIcon = styled.span<{ inputvalue: string }>`
  color: #ccc;
  opacity: ${({ inputvalue }) => (inputvalue ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
  cursor: pointer;
`;

export const DropdownContainer = styled.ul`
  overflow-y: auto;
  padding-left: 1rem;
`;
