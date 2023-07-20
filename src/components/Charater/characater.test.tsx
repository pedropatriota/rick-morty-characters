import { cleanup, render, screen } from "@testing-library/react";
import Character from ".";

const setup = () => {
  const utils = render(
    <Character
      name={"Rick Sanchez"}
      image="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
    />
  );

  return {
    ...utils,
  };
};

afterEach(cleanup);

describe("ListItem", () => {
  it("should render each item from the list", async () => {
    setup();

    const image = await screen.findByAltText("Rick Sanchez");
    const name = await screen.findByText("Rick Sanchez");

    expect(image).toBeTruthy();
    expect(name).toBeTruthy();
  });

  it("should match snapshot", () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });
});
