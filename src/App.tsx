import SearchBar from "./components/SearchBar";
import logo from "./assets/RickAndMortyLogo.png";
import * as Styled from "./app.styles";

function App() {
  return (
    <Styled.Container>
      <Styled.LogoImg src={logo} alt="logo Rick and Morty" />
      <SearchBar />
    </Styled.Container>
  );
}

export default App;
