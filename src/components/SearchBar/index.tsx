import { Character } from "..";
import useSearchBar from "./useSearchBar";
import * as Styled from "./styles";

const SearchBar = () => {
  const {
    expand,
    inputValue,
    result,
    ref,
    expandSearchBox,
    handleChangeInputValue,
    clearInputValue,
  } = useSearchBar();

  return (
    <Styled.SearchContainer
      expand={expand.toString()}
      ref={ref}
      data-testid="search-container"
    >
      <Styled.InputContainer>
        <Styled.Input
          onFocus={expandSearchBox}
          onChange={handleChangeInputValue}
          value={inputValue}
          placeholder="Make your search..."
        />
        {inputValue && (
          <Styled.CloseIcon onClick={clearInputValue}>
            &#10006;
          </Styled.CloseIcon>
        )}
      </Styled.InputContainer>
      <Styled.DropdownContainer>
        {result?.map(({ name, id, image }) => (
          <Character
            key={id}
            name={name}
            image={image}
            inputValue={inputValue}
          />
        ))}
      </Styled.DropdownContainer>
    </Styled.SearchContainer>
  );
};

export default SearchBar;
