import styled from "styled-components";

export const SearchContainer = styled.div<{ expand: boolean }>`
  width: 34em;
  height: ${({ expand }) => (expand ? "30em" : "4em")};
  display: flex;
  flex-direction: column;
  margin-top: 5rem;
  background-color: #fff;
  overflow: hidden;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  padding: 0 1rem;
  transition: height 0.2s ease-in-out;
`;

export const InputContainer = styled.div`
  width: 100%;
  min-height: 4em;
  display: flex;
  align-items: center;
  position: relative;
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
  }
  &::placeholder {
    color: #ccc;
  }
`;
