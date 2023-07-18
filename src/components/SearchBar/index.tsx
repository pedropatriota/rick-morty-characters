import { useState } from "react";
import * as Styled from "./styles";

const SearchBar = () => {
  const [expand, setExpand] = useState(false);

  const expandSearchBox = () => {
    setExpand(true);
  };

  const collapseSearchBox = () => {
    setExpand(false);
  };

  return (
    <Styled.SearchContainer expand={expand}>
      <Styled.InputContainer>
        <Styled.Input onFocus={expandSearchBox} onBlur={collapseSearchBox} />
      </Styled.InputContainer>
    </Styled.SearchContainer>
  );
};

export default SearchBar;
