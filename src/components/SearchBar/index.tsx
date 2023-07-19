import { useEffect, useState } from "react";
import { useClickOutside, useDebounce } from "../../hooks";
import { searchData } from "../../service/fetchRequest";
import type { ICharacterProps } from "../../service/contracts";
import { Character } from "..";
import * as Styled from "./styles";

const SearchBar = () => {
  const [expand, setExpand] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState<ICharacterProps[] | undefined>([]);

  const ref = useClickOutside(() => setExpand(false));

  const debouncedValue = useDebounce(inputValue, 500);

  useEffect(() => {
    if (debouncedValue) {
      searchData(debouncedValue)
        .then((data) => setResult(data))
        .catch((err) => console.log(err));
    } else {
      setResult([]);
    }
  }, [debouncedValue]);

  const expandSearchBox = () => {
    setExpand(true);
  };

  const collapseSearchBox = () => {
    setExpand(false);
  };

  const handleChangeInputValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputValue(event.target.value);
  };

  const clearInputValue = () => {
    setInputValue("");
    collapseSearchBox();
    setResult([]);
  };

  return (
    <Styled.SearchContainer expand={expand.toString()} ref={ref}>
      <Styled.InputContainer>
        <Styled.Input
          onFocus={expandSearchBox}
          onChange={handleChangeInputValue}
          value={inputValue}
          placeholder="Make your search..."
        />
        <Styled.CloseIcon inputvalue={inputValue} onClick={clearInputValue}>
          &#10006;
        </Styled.CloseIcon>
      </Styled.InputContainer>
      <Styled.DropdownContainer>
        {result?.map(({ name, id, image }) => (
          <Character id={id} name={name} image={image} />
        ))}
      </Styled.DropdownContainer>
    </Styled.SearchContainer>
  );
};

export default SearchBar;
