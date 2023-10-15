import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it } from "@jest/globals";
import store from "@/store/store";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { setCurrency, setResult } from "@/store/currencySlice";
import SwapButton from "./SwapButton";

describe("Swap Button tests", () => {
  it("swaps from and to values and resets result", async () => {
    store.dispatch(setCurrency({ id: "from", value: "EUR" }));
    store.dispatch(setCurrency({ id: "to", value: "USD" }));
    store.dispatch(setResult("1 EUR equals 1.3343 USD"));

    // ARRANGE
    render(
      <Provider store={store}>
        <SwapButton />
      </Provider>
    );
    const element = screen.getByTestId("swap-button");

    // ASSERT
    expect(element).toBeInTheDocument();

    fireEvent.click(element);

    expect(store.getState().currency.value.from).toEqual("USD");
    expect(store.getState().currency.value.to).toEqual("EUR");
    expect(store.getState().currency.result).toEqual(null);
  });
});
