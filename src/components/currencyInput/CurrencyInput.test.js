import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it } from "@jest/globals";
import userEvent from "@testing-library/user-event";
import store from "@/store/store";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import CurrencyInput from "./CurrencyInput";

describe("input currency test", () => {
  it("renders initially with 1.0", async () => {
    // ARRANGE
    render(
      <Provider store={store}>
        <CurrencyInput />
      </Provider>
    );

    // ASSERT
    expect(screen.getByTestId("currency-input").value).toEqual("1.0");
  });
  it("value is formatted on blur", async () => {
    // ARRANGE
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <CurrencyInput />
      </Provider>
    );

    const element = screen.getByTestId("currency-input");
    fireEvent.change(element, { target: { value: "12" } });
    fireEvent.blur(element);

    // ASSERT
    expect(element.value).toEqual("12.0");
  });
  it("empty input shows placeholder 0.0", async () => {
    // ARRANGE
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <CurrencyInput />
      </Provider>
    );

    const element = screen.getByTestId("currency-input");
    fireEvent.change(element, { target: { value: "" } });

    // ASSERT
    expect(element.placeholder).toEqual("0.0");
  });
  it("accepts only numbers", async () => {
    // ARRANGE
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <CurrencyInput />
      </Provider>
    );

    const element = screen.getByTestId("currency-input");

    // ASSERT
    fireEvent.change(element, { target: { value: "" } });
    fireEvent.change(element, { target: { value: "312" } });
    expect(element.value).toEqual("312");
    fireEvent.change(element, { target: { value: "ewqrf" } });
    expect(element.value).toEqual("312");
  });
});
