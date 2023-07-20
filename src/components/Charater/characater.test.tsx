import { cleanup, render, screen } from "@testing-library/react";
import Character from ".";
import { highlightMatchedString } from ".";

const setup = () => {
  const utils = render(
    <Character
      inputValue="Rick"
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
    const name = await screen.findByText("Rick");

    expect(image).toBeTruthy();
    expect(name).toBeTruthy();
  });

  it("should match snapshot", () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });
});

describe("highlightMatchedString", () => {
  it("should return the original text when there is no match", () => {
    const text = "Hello";
    const highlight = "notfound";
    const result = highlightMatchedString(text, highlight);
    const { container } = render(result);
    expect(container.innerHTML).toBe("<span>Hello</span>");
  });

  it("should highlight the matched part of the string", () => {
    const text = "Hello, World!";
    const highlight = "hello";
    const result = highlightMatchedString(text, highlight);
    const { container } = render(result);
    expect(container.innerHTML).toBe(
      "<span><strong>Hello</strong>, World!</span>"
    );
  });

  it("should be case-insensitive when highlighting", () => {
    const text = "apple orange apple";
    const highlight = "APPLE";
    const result = highlightMatchedString(text, highlight);
    const { container } = render(result);
    expect(container.innerHTML).toBe(
      "<span><strong>apple</strong> orange <strong>apple</strong></span>"
    );
  });
});
