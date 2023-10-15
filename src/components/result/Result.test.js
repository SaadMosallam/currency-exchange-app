import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it } from "@jest/globals";
import store from "@/store/store";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import {
  initialState,
  setAmount,
  setCurrenciesList,
  setCurrency,
  setError,
  setResult,
  setIsLoading,
  reset,
} from "@/store/currencySlice";
import Result from "./Result";

describe("Result component tests", () => {
  beforeEach(() => {
    store.dispatch(reset());
  });
  it("shows error", async () => {
    store.dispatch(setCurrenciesList(["EUR", "SGD", "USD"]));
    store.dispatch(setAmount("12"));
    store.dispatch(setError("Error"));
    store.dispatch(setCurrency({ id: "from", value: "EUR" }));
    store.dispatch(setCurrency({ id: "to", value: "USD" }));
    store.dispatch(setResult("1 EUR equals 1.3343 USD"));

    // ARRANGE
    render(
      <Provider store={store}>
        <Result debouncedAmount="23" />
      </Provider>
    );
    const element = screen.getByText("Error loading data");

    // ASSERT
    expect(element).toBeInTheDocument();
  });
  it("shows loading", async () => {
    store.dispatch(setCurrenciesList(["EUR", "SGD", "USD"]));
    store.dispatch(setAmount("12"));
    store.dispatch(setIsLoading(true));
    store.dispatch(setCurrency({ id: "from", value: "EUR" }));
    store.dispatch(setCurrency({ id: "to", value: "USD" }));
    store.dispatch(setResult("1 EUR equals 1.3343 USD"));

    // ARRANGE
    render(
      <Provider store={store}>
        <Result debouncedAmount="23" />
      </Provider>
    );
    const element = screen.getByTestId("loading");

    // ASSERT
    expect(element).toBeInTheDocument();
  });
  it("shows result", async () => {
    store.dispatch(setCurrenciesList(["EUR", "SGD", "USD"]));
    store.dispatch(setAmount("12"));
    store.dispatch(setCurrency({ id: "from", value: "EUR" }));
    store.dispatch(setCurrency({ id: "to", value: "USD" }));
    store.dispatch(setResult("1 EUR equals 1.3343 USD"));

    // ARRANGE
    render(
      <Provider store={store}>
        <Result debouncedAmount="23" />
      </Provider>
    );
    const element = screen.getByTestId("result");

    // ASSERT
    expect(element).toBeInTheDocument();
  });
});
