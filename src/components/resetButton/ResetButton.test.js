import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it } from "@jest/globals";
import store from "@/store/store";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import ResetButton from "./ResetButton";
import {
  initialState,
  setAmount,
  setCurrenciesList,
  setCurrency,
  setIsLoading,
  setResult,
} from "@/store/currencySlice";

describe("Reset Button tests", () => {
  it("reset button shows when all fields are filled, and clears values", async () => {
    store.dispatch(setCurrenciesList(["EUR", "SGD", "USD"]));
    store.dispatch(setAmount("12"));
    store.dispatch(setCurrency({ id: "from", value: "EUR" }));
    store.dispatch(setCurrency({ id: "to", value: "USD" }));
    store.dispatch(setResult("1 EUR equals 1.3343 USD"));

    // ARRANGE
    render(
      <Provider store={store}>
        <ResetButton />
      </Provider>
    );
    const element = screen.getByTestId("reset-button");

    // ASSERT
    expect(element).toBeInTheDocument();

    fireEvent.click(element);
    expect(element).not.toBeInTheDocument();

    expect(store.getState().currency.value.from).toEqual(
      initialState.value.from
    );
    expect(store.getState().currency.value.to).toEqual(initialState.value.to);
    expect(store.getState().currency.amount).toEqual(initialState.amount);
    expect(store.getState().currency.result).toEqual(initialState.result);
  });
});
