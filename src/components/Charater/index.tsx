import * as Styled from "./styles";
import type { ICharacterProps } from "./contracts";

const Character = ({ image, name }: ICharacterProps) => (
  <Styled.LisContainer>
    <Styled.InfoContainer>
      <Styled.CharacterImg src={image} alt={name} />
      <span>{name}</span>
    </Styled.InfoContainer>
  </Styled.LisContainer>
);

export default Character;
