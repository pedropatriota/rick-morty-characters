import { useState, useEffect, useCallback } from "react";
import { searchData } from "../../service/fetchRequest";
import type { ICharacterProps } from "../../service/contracts";
import { useClickOutside, useDebounce } from "../../hooks";

const useSearchBar = () => {
  const [expand, setExpand] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState<ICharacterProps[] | undefined>([]);

  const ref = useClickOutside(() => setExpand(false));
  const debouncedValue = useDebounce(inputValue, 200);

  useEffect(() => {
    if (debouncedValue) {
      searchData(debouncedValue)
        .then((data) => setResult(data))
        .catch((err) => console.log(err));
    } else {
      setResult([]);
    }
  }, [debouncedValue]);

  const expandSearchBox = useCallback(() => {
    setExpand(true);
  }, []);

  const collapseSearchBox = useCallback(() => {
    setExpand(false);
  }, []);

  const handleChangeInputValue = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    },
    []
  );

  const clearInputValue = useCallback(() => {
    setInputValue("");
    collapseSearchBox();
    setResult([]);
  }, []);

  return {
    expand,
    inputValue,
    result,
    ref,
    expandSearchBox,
    handleChangeInputValue,
    clearInputValue,
  };
};

export default useSearchBar;
