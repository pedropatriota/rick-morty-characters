import * as Styled from "./styles";
import type { ICharacterProps } from "./contracts";

export function highlightMatchedString(text: string, highlight: string) {
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <span>
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <strong key={index}>{part}</strong>
        ) : (
          part
        )
      )}
    </span>
  );
}

const Character = ({ image, name, inputValue }: ICharacterProps) => (
  <Styled.LisContainer>
    <Styled.InfoContainer>
      <Styled.CharacterImg src={image} alt={name} />
      {highlightMatchedString(name, inputValue)}
    </Styled.InfoContainer>
  </Styled.LisContainer>
);

export default Character;
