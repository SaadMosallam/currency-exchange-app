import store from "@/store/store";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import React from "react";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
