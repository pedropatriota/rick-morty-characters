import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchBar } from "..";

const setup = () => {
  const utils = render(<SearchBar />);
  return {
    ...utils,
  };
};

afterEach(() => cleanup);

describe("SearchBar", () => {
  it("should render the initial state correctly", async () => {
    setup();

    const input = (await screen.findByRole("textbox")) as HTMLInputElement;
    const searchContainer = screen.getByTestId("search-container");
    const closeIcon = screen.queryByText(/✖/i);

    expect(input).toBeInTheDocument();
    expect(input).not.toHaveFocus();
    expect(input.value).toBe("");
    expect(searchContainer).toHaveStyle("height: 4rem");
    expect(closeIcon).not.toBeInTheDocument();
  });

  it("should render correctly after focus", async () => {
    const { container } = setup();

    const input = (await screen.findByRole("textbox")) as HTMLInputElement;
    const searchContainer = screen.getByTestId("search-container");

    await userEvent.click(input);
    fireEvent.focus(input);

    expect(searchContainer).toHaveStyle("height: 25rem");
    expect(input).toHaveFocus();
  });

  it("should be able type in the input and fetch the API", async () => {
    setup();

    const input = (await screen.findByRole("textbox")) as HTMLInputElement;
    const searchContainer = screen.getByTestId("search-container");

    await userEvent.click(input);
    fireEvent.focus(input);

    expect(searchContainer).toHaveStyle("height: 25rem");
    expect(input).toHaveFocus();

    await userEvent.type(input, "Rick Sanchez");
    expect(input.value).toBe("Rick Sanchez");

    const name = await screen.findAllByText("Rick Sanchez");

    const closeIcon = screen.queryByText(/✖/i);

    expect(closeIcon).toBeInTheDocument();
    expect(name.length).toBe(4);
  });

  it("should collapse the dropdown", async () => {
    setup();

    const input = (await screen.findByRole("textbox")) as HTMLInputElement;
    const searchContainer = screen.getByTestId("search-container");

    await userEvent.click(input);
    fireEvent.focus(input);
    expect(searchContainer).toHaveStyle("height: 25rem");
    await userEvent.type(input, "Rick Sanchez");

    const name = await screen.findAllByText("Rick Sanchez");
    const closeIcon = await screen.findByText(/✖/i);

    await userEvent.click(closeIcon);

    expect(input.value).toBe("");
    expect(searchContainer).toHaveStyle("height: 4rem");
  });
});
