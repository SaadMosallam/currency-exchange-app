import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it } from "@jest/globals";
import store from "@/store/store";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { reset } from "@/store/currencySlice";
import Dropdown from "./Dropdown";

describe("Dropdown tests", () => {
  beforeEach(() => {
    store.dispatch(reset());
  });
  it("clicking on dropdown button shows the menu", async () => {
    // ARRANGE
    render(
      <Provider store={store}>
        <Dropdown id="from" />
      </Provider>
    );
    const button = screen.getByTestId("dropdown-button");
    const beforeMenu = screen.queryByTestId("dropdown-menu");

    expect(beforeMenu.classList.value.includes("false")).toEqual(true);
    // ASSERT
    fireEvent.click(button);
    const afterMenu = screen.getByTestId("dropdown-menu");
    expect(afterMenu.classList.value.includes("active")).toEqual(true);
  });
});
