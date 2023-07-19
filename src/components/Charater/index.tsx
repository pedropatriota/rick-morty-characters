import * as Styled from "./styles";
import type { ICharacterProps } from "./contracts";

const Character = ({ id, image, name }: ICharacterProps) => (
  <Styled.LisContainer key={id}>
    <Styled.InfoContainer>
      <img src={image} alt={name} />
      <span>{name}</span>
    </Styled.InfoContainer>
  </Styled.LisContainer>
);

export default Character;
